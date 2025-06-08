const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

function getIP(req) {
  return (
    req.headers['x-forwarded-for']?.split(',').shift() ||
    req.socket?.remoteAddress ||
    null
  );
}

app.get('/', async (req, res) => {
  try {
    const ip = getIP(req) || 'Unknown IP';
    const url = `http://ip-api.com/json/${ip}`;
    const response = await axios.get(url);
    const location = response.data;

    console.log(`Visitor IP: ${ip}`);
    console.log(`Location: ${location.city}, ${location.country}`);

    res.send(`
      <h1>Welcome to Your IP Tracker!</h1>
      <p>Your IP address: <strong>${ip}</strong></p>
      <p>Your location: <strong>${location.city}, ${location.country}</strong></p>
    `);
  } catch (error) {
    console.error(error);
    res.send('Oops! Something went wrong.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
