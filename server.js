const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

// Enable CORS
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, './build')));

// Connect to MongoDB
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';
MongoClient.connect(mongoUri)
    .then(dbRef => {
        const dbObj = dbRef.db('sampledb');
        const UsersCol = dbObj.collection('UserCol');
        app.set('UserCol', UsersCol);
        console.log('Database connection successful!!!');
    })
    .catch(err => console.log('Error in connecting database:', err));

// Import user API
let UserAPI = require('../new_app/APIS/UserAPI');
app.use('/users-api', UserAPI);

// Middleware for invalid path
const invalidPath = (request, response, next) => {
    response.status(404).send({ message: 'Invalid path' });
};
app.use(invalidPath);

// Middleware for error handling
const dealWithErrors = (error, request, response, next) => {
    response.status(500).send({ message: error.message });
};
app.use(dealWithErrors);

// Middleware to handle page refresh (keep this last)
const pageRefresh = (request, response, next) => {
    response.sendFile(path.join(__dirname, './build/index.html'));
};
app.use('*', pageRefresh);

// Start server
app.listen(port, () => console.log(`Web Server running on port ${port}...`));
