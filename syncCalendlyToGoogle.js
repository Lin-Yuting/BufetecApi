const { authorize } = require('./googleAuth');
const { fetchCalendlyEvents, fetchInvitees } = require('./calendlyApi');
const { insertEventToGoogleCalendar } = require('./googleCalendarApi');
const Event = require('./model/Event');

async function syncCalendlyToGoogleCalendar() {
  console.log('Starting synchronization process...');
  try {
    const auth = await authorize();
    console.log('Google OAuth2 authorization successful.');

    const calendlyEvents = await fetchCalendlyEvents();
    console.log(`Fetched ${calendlyEvents.length} active events from Calendly.`);

    for (const calendlyEvent of calendlyEvents) {
      console.log('Calendly Event Data:', JSON.stringify(calendlyEvent, null, 2));

      let calendlyEventId;
      if (calendlyEvent.uri) {
        const uriSegments = calendlyEvent.uri.split('/');
        calendlyEventId = uriSegments[uriSegments.length - 1];
      } else {
        console.log('Skipping event due to missing URI.');
        continue;
      }

      const eventName = calendlyEvent.name || 'Unnamed Event';

      // Check if the event has already been synced
      const existingMapping = await Event.findOne({ where: { calendlyEventId: calendlyEventId } });
      if (existingMapping) {
        console.log(`Event "${eventName}" has already been synced. Skipping.`);
        continue; // Skip to the next event
      }

      console.log(`Syncing event: ${eventName}`);

      let googleEventId;

      // Determine if the event is already linked to Google Calendar
      if (calendlyEvent.calendar_event && calendlyEvent.calendar_event.kind === 'google') {
        // Use the existing Google Calendar Event ID
        googleEventId = calendlyEvent.calendar_event.external_id;
        console.log(`Event is already linked to Google Calendar with ID: ${googleEventId}`);
      } else {
        // Insert the event into Google Calendar and retrieve the new Google Event ID
        googleEventId = await insertEventToGoogleCalendar(auth, calendlyEvent);
      }

      // Calculate duration in minutes
      const startTime = new Date(calendlyEvent.start_time);
      const endTime = new Date(calendlyEvent.end_time);
      const duration = Math.round((endTime - startTime) / (1000 * 60)); // Duration in minutes

      // Fetch invitees for the event
      const invitees = await fetchInvitees(calendlyEvent.uri);
      let client = 'Unknown Client';
      if (invitees.length > 0) {
        client = invitees[0].name || invitees[0].email || 'Unknown Client';
      }

      // Extract host (abogado) information
      let host = 'Unknown Host';
      if (calendlyEvent.event_memberships && calendlyEvent.event_memberships.length > 0) {
        // Assuming the first membership is the host
        host = calendlyEvent.event_memberships[0].user_name || 'Unknown Host';
      }

      // Extract date and starting time
      const date = startTime.toISOString().split('T')[0]; // YYYY-MM-DD
      const startTimeStr = startTime.toTimeString().split(' ')[0]; // HH:MM:SS

      // Save the event details to db
      await Event.create({
        googleEventId: googleEventId,
        calendlyEventId: calendlyEventId,
        date: date,
        startTime: startTimeStr,
        duration: duration,
        client: client,
        host: host,
      });

      console.log(`Event "${eventName}" synced successfully with Google Calendar ID: ${googleEventId}`);
    }
    console.log('Synchronization process completed.');
  } catch (error) {
    console.error('Error syncing Calendly to Google Calendar:', error);
  }
}

module.exports = {
  syncCalendlyToGoogleCalendar,
};