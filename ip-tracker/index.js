const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Middleware to get IP address from request
app.use((req, res, next) => {
  req.clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  next();
});

app.get('/', async (req, res) => {
  const ip = req.clientIp;

  try {
    // Use a free IP geolocation API
    const response = await axios.get(`https://ipapi.co/${ip}/json/`);
    const location = response.data;

    res.send(`
      <h1>Your IP Tracker</h1>
      <p><strong>IP Address:</strong> ${ip}</p>
      <p><strong>City:</strong> ${location.city || 'N/A'}</p>
      <p><strong>Region:</strong> ${location.region || 'N/A'}</p>
      <p><strong>Country:</strong> ${location.country_name || 'N/A'}</p>
      <p><strong>Latitude:</strong> ${location.latitude || 'N/A'}</p>
      <p><strong>Longitude:</strong> ${location.longitude || 'N/A'}</p>
    `);
  } catch (error) {
    res.send(`<p>Could not fetch location for IP: ${ip}</p>`);
  }
});

app.listen(port, () => {
  console.log(`IP Tracker app listening at http://localhost:${port}`);
});
app.get('/', async (req, res) => {
  const ip = req.clientIp;

  try {
    const response = await axios.get(`https://ipapi.co/${ip}/json/`);
    const location = response.data;

    // Log visitor IP and location in your console
    console.log(`Visitor IP: ${ip}`);
    console.log(`Location: ${location.city}, ${location.region}, ${location.country_name}`);

    res.send(`
      <h1>Your IP Tracker</h1>
      <p><strong>IP Address:</strong> ${ip}</p>
      <p><strong>City:</strong> ${location.city || 'N/A'}</p>
      <p><strong>Region:</strong> ${location.region || 'N/A'}</p>
      <p><strong>Country:</strong> ${location.country_name || 'N/A'}</p>
      <p><strong>Latitude:</strong> ${location.latitude || 'N/A'}</p>
      <p><strong>Longitude:</strong> ${location.longitude || 'N/A'}</p>
    `);
  } catch (error) {
    console.log(`Failed to get location for IP: ${ip}`);
    res.send(`<p>Could not fetch location for IP: ${ip}</p>`);
  }
});