var express = require('express');
var app = express();
var session = require('express-session')
var config = require('./config/platform-pivotal');

var user = require('./app/controllers/user');
var fileUpload = require('./app/controllers/file-upload');

app.set('view engine', 'jade');

// Routes
app.use('/files', fileUpload(config));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(__dirname + '/public'));

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

function current_user(req){
  if (req.session.user_login){
    return {
      login: "demo"
    }
  }
  return null;
}

app.get('/api/session', function (req, res) {
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

app.post('/api/session', function (req, res) {
  if (req.body.login === 'demo' && req.body.password === 'kinetic'){

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

function destroySession(req, res){
  req.session.user_login = null;
  res.send(JSON.stringify({ success: true }));
};

app.get('/api/session/destroy', destroySession);
app.delete('/api/session', destroySession);

app.get(['/'], function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

server = app.listen(parseInt(config.get("appPort")), function() {
  console.log('Listening on port %d', server.address().port);
});