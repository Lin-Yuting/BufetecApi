require('dotenv').config();
const axios = require('axios');

const calendlyToken = process.env.CALENDLY_TOKEN;

// Debugging: Log whether the token is loaded (without printing the token itself)
if (!calendlyToken) {
  console.error('Calendly token is not set in the environment variables.');
} else {
  console.log('Calendly token loaded successfully.');
}

async function fetchCalendlyEvents() {
  try {
    // Fetch user details
    const userResponse = await axios.get('https://api.calendly.com/users/me', {
      headers: {
        'Authorization': `Bearer ${calendlyToken}`,
        'Content-Type': 'application/json',
      },
    });

    const userUri = userResponse.data.resource.uri;
    console.log(`Fetched User URI: ${userUri}`);

    // Get the current date-time in ISO 8601 format
    const currentTime = new Date().toISOString();

    // Fetch scheduled events for the user
    const eventsResponse = await axios.get('https://api.calendly.com/scheduled_events', {
      headers: {
        'Authorization': `Bearer ${calendlyToken}`,
        'Content-Type': 'application/json',
      },
      params: {
        user: userUri,
        count: 50,
        min_start_time: currentTime, // Only fetch events starting now or in the future
      },
    });

    const events = eventsResponse.data.collection;

    // Filter out canceled or inactive events based on the 'status' property
    const activeEvents = events.filter(event => event.status === 'active');
    console.log(`Fetched ${activeEvents.length} active events from Calendly.`);

    return activeEvents;
  } catch (error) {
    console.error('Error fetching Calendly events:', error.response ? error.response.data : error.message);
    throw error;
  }
}

async function fetchInvitees(calendlyEventUri) {
  try {
    const response = await axios.get(`${calendlyEventUri}/invitees`, {
      headers: {
        'Authorization': `Bearer ${calendlyToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data.collection; // Array of invitees
  } catch (error) {
    console.error('Error fetching invitees:', error.response ? error.response.data : error.message);
    return []; // Return empty array if there's an error
  }
}

module.exports = {
  fetchCalendlyEvents,
  fetchInvitees
};