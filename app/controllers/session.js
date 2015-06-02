// import express
var express = require('express');
var cookieParser = require('cookie-parser');

var session = require('express-session');
var loginBase = require('./base/login-base');

var fs = require('fs');

var http = require('http');

module.exports = function(conf) {
    config = conf;
    var router = express.Router();
    createRoutes(router);
    return router;
};

function createRoutes(router) {
    router.use(cookieParser());
    router.get('', get);
    router.post('', post);
  //  router.get('/current_user', current_user);
    router.get('/destroy', destroySession);
    router.delete('', destroySession);
};


function current_user(req) {
    if (req.session.user_id) {
        return {
            user_id: req.session.user_id
            
        }
        console.log(user_id);
    }
    return null;
}

////app.get('/api/session', 
function get(req, res) {
    var user = current_user(req);
    if (!user) {
        res.status(401);
        res.send();
    } else {
        res.send(JSON.stringify({
            user_id: user.user_id
        }));
    }
};

//app.post('/api/session', 
function post(req, res) {
    //if (req.body.login === 'demo' && req.body.password === 'kinetic') 
    // запрос в базу (login, pass, callback, errcallback)
    // запрос вызовет callback если юзер есть и передаст в callback его id, для будущего использования
    // вызовет errorCallback в остальных случаях
    var login = req.body.login;
    var password = req.body.password;

    loginBase.CheckLoginPass(login, password, function(result) {

        req.session.user_id = result;
        res.send({
            success: true,
            user: {
                user_id: req.session.user_id
            }
        });

        //  console.log(user); 

    }, function(err) {
        res.status(401);
        res.send({
            success: false,
            errors: err
        });
    });


};



function destroySession(req, res) {
    req.session.user_id = null;
    res.send(JSON.stringify({
        success: true
    }));
};
