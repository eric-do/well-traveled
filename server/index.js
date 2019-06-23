const express = require('express');
const path = require('path');
const parser = require('body-parser');
const { getLocations, getLandmarks, 
        getQuestions, getAnswers } = require('./controllers');

const app = express();
const port = 3000;

// MIDDLEWARE
app.use(express.static(path.join(__dirname, '../public/dist')));
app.use(parser.json());
app.use(parser.urlencoded({
  extended: true,
}));

// ROUTES
app.get('/locations', (req, res) => {
  getLocations(req, res);
});

app.get('/landmarks', (req, res) => {
  getLandmarks(req, res);
});

app.get('/questions', (req, res) => {
  getQuestions(req, res);
});

app.get('/answers', (req, res) => {
  getAnswers(req, res);
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/dist/index.html'));
});

// LISTENER
app.listen(port, () => {
  console.log(`Listning on port ${port}`);
});