const express = require('express');
const routes = require('./routes')

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Expose-Headers', 'Authorization');

  next();
});

app.use(routes);


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});