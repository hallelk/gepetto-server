const compression = require('compression')
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const APIController = require('./APIController.js');
const path = require('path');

const app = express();

app.use(cors());
app.set('trust proxy', true);
app.use(helmet());
app.use(compression())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));


// app.use(function(_, res, next) {
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Origin", "https://xxx.xxx.com");
//   res.header('Access-Control-Expose-Headers', 'X-Access-Token, x-access-token');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, x-access-token");
//   next();
// });
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, _) => { res.send('hallo and welcome to the gepetto server'); });
app.use('/api/', APIController);

module.exports = app;