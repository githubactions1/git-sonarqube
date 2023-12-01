var express = require('express');
const app = express();
var expressSession = require('express-session');
var MySQLStore = require('express-mysql-session')(expressSession);
// var app = express();
let http = require('http');
var fs = require('fs');
var path = require('path');
var cors = require('cors')
var util = require('util');
var appRoot = __dirname;
var df = require(appRoot + '/utils/dflower.utils');

app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(cors()); 



// app.use(express.static(path.join(__dirname, '/algtHst')));
var sqldb = require(appRoot + '/config/db.config');

sessionStore = '';
sqldb.MySQLConPool.getConnection(function (err, connection) { // get connection from Connection Pool
  if (err) {

    console.log(err)
    return err;
  } else {
    console.log("db connected")
  }

});


app.use(function (req, res, next) {
  // Website you wish to allow to connect
  // res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // response headers you wish to expose
  res.setHeader('Access-Control-Expose-Headers', 'x-access-token');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  //res.setHeader('Access-Control-Allow-Origin', '*');
  //res.setHeader('Access-Control-Allow-Origin', 'http://103.167.216.233');
  next();
});
app.use('/apirt1/nmsuat', require('./server/routes/approutes'));
console.log("Hello World!")


  
var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;
 console.log('app.listen')
});



const MAX_CONNECTIONS = 900;
const activeSockets = new Set();
const net = require('net');
console.log("new socket")







