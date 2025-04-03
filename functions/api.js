const express = require('express');
const serverless = require('serverless-http');
const path = require('path');
const app = express();

// Set up EJS with a custom views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Middleware
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Your movies and reviews data
const movies = [
  // Your movies array
];

let reviews = [
  // Your reviews array
];

// Your routes
app.get('/', (req, res) => {
  res.render('index', { movies });
});

// Other routes
// ...

// Export the serverless function
module.exports.handler = serverless(app);