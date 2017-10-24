// Get dependencies
require('dotenv').config();
const express = require('express');
const path = require('path');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
var db;

const app = express();
// Get our API routes
const authApi = require('./routes/auth');

// Parsers for POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// use morgan to log requests to the console
app.use(morgan('dev'));
// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

//connect to DB using MongoDB
MongoClient.connect(process.env.DB_URL, (err, database) => {
	if (err) return console.log(err);
	db = database;
});

//add the db object to global app so it can be accesse on each request
app.use(function(req, res, next) {
	req.db = db; //this db comes from app.js context where you define it
	next();
});
// Set our api routes. Needs to be below the DB
app.use('/api/auth', authApi);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '1337';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
