// Setup express
const express = require('express');

// Import middleware
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:5000',
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type,Authorization',
};


// Create express app
const app = express();


// Implement middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(cookieParser());


// Import Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

// Setup Routes
app.use(`/api/auth`, authRoutes);
app.use(`/api/user`, userRoutes);


// Setup default port
app.set('port', process.env.PORT || 5000);

// Start express app
app.listen(app.get('port'), () => {
    console.log(`Server running at port: ${app.get('port')}`)
});