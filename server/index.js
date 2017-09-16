// Main server script
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const router = require('./router');

// DB setup
mongoose.connect(config.db.mongodb, {
  useMongoClient: true
});

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