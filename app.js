var express = require('express');
var app = express();
var session = require('express-session')

var fileUpload = require('./app/controllers/file-upload');

var sessionCtrl = require('./app/controllers/session');
var admin = require('./app/controllers/admin');
var registration = require('./app/controllers/registration');
var subject = require('./app/controllers/subject');


var server_port = process.env.OPENSHIFT_NODEJS_PORT || 9000;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';


app.set('view engine', 'jade');



app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(__dirname + '/public'));

var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));

// Routes
app.use('/api/files', fileUpload());
app.use('/api/admin', admin());
app.use('/api/registration', registration());
app.use('/api/session', sessionCtrl());
app.use('/api/subject', subject());



app.get(['^/?[^\\.]*$'], function(req, res) {
  res.sendfile(__dirname + '/public/index.html');
});


server = app.listen(server_port, server_ip_address, function(){
  console.log("Listening on " + server_ip_address + ", server_port " + server_port)
});