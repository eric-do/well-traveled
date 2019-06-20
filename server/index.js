const express = require('express');
const path = require('path');
const parser = require('body-parser');

const app = express();
const port = 3000;

// MIDDLEWARE
app.use(express.static(path.join(__dirname, '../public/dist')));
app.use(parser.json());
app.use(parser.urlencoded({
  extended: true,
}));

// ROUTES

// LISTENER
app.listen(port, () => {
  console.log(`Listning on port ${port}`);
});