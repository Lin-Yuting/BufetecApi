require("dotenv").config();
const { google } = require('googleapis');

async function insertEventToGoogleCalendar(auth, calendlyEvent) {
  const calendar = google.calendar({ version: 'v3', auth });

  const event = {
    summary: calendlyEvent.name,
    description: `Scheduled via Calendly`,
    start: {
      dateTime: calendlyEvent.start_time,
      timeZone: calendlyEvent.timezone || 'CST',
    },
    end: {
      dateTime: calendlyEvent.end_time,
      timeZone: calendlyEvent.timezone || 'CST',
    },
  };

  try {
    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });
    console.log(`Event created: ${response.data.summary}`);
    return response.data.id; // Google Calendar Event ID
  } catch (error) {
    if (error.code === 409) {
      console.log(`Event "${event.summary}" already exists in Google Calendar.`);
    } else {
      console.error('Error inserting event into Google Calendar:', error);
    }
    throw error;
  }
}

module.exports = {
  insertEventToGoogleCalendar,
};