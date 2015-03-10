var express = require('express');
var app = express();
var session = require('express-session')

var fileUpload = require('./app/controllers/file-upload');

var admin = require('./app/controllers/admin');

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

function current_user(req) {
  if (req.session.user_login) {
    return {
      login: "demo"
    }
  }
  return null;
}

app.get('/api/session', function(req, res) {
  var user = current_user(req);
  if (!user) {
    res.status(401);
    res.send();
  } else {
    res.send(JSON.stringify({
      login: user.login
    }));
  }
});

app.post('/api/session', function(req, res) {
  if (req.body.login === 'demo' && req.body.password === 'kinetic') {

    req.session.user_login = 'demo';
    res.send(JSON.stringify({
      success: true,
      user: {
        login: req.session.user_login
      }
    }));
  } else {
    res.status(401);
    res.send(
      JSON.stringify({
        success: false,
        errors: ["Login or password incorrect"]
      })
    )
  };
});

function destroySession(req, res) {
  req.session.user_login = null;
  res.send(JSON.stringify({
    success: true
  }));
};

app.get('/api/session/destroy', destroySession);
app.delete('/api/session', destroySession);

app.get(['^/?[^\\.]*$'], function(req, res) {
  res.sendfile(__dirname + '/public/index.html');
});


server = app.listen(server_port, server_ip_address, function(){
  console.log("Listening on " + server_ip_address + ", server_port " + server_port)
});