const express = require('express');
const router = express.Router();
const { oAuth2Client, authorize, saveCredentials, SCOPES } = require('../googleAuth');
const { google } = require('googleapis');

// Route to initiate OAuth flow
router.get('/google', (req, res) => {
  const url = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  res.redirect(url);
});

// OAuth2 callback route
router.get('/oauth2callback', async (req, res) => {
  const code = req.query.code;
  if (!code) {
    return res.status(400).send('Authorization code not provided.');
  }

  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    await saveCredentials(oAuth2Client);
    res.send('Authentication successful! You can close this window.');
  } catch (error) {
    console.error('Error obtaining Google OAuth2 tokens:', error);
    res.status(500).send('Error during authentication.');
  }
});

module.exports = router;