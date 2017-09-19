// Main server script
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();

// DB setup
mongoose.Promise = global.Promise;
mongoose.connect(config.db.mongodb, {
  useMongoClient: true
});

const router = require('./router');

// App setup (express)
//  -- register middleware
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());
router(app);

// Server setup
const port = process.env.PORT || 8080;
const server = http.createServer(app);
server.listen(port);
console.log(`Server is running on port ${port}`);