// import express
var express = require('express');
var cookieParser = require('cookie-parser');

var session = require('express-session');

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
    router.get('/destroy', destroySession);
    router.delete('', destroySession);
};


function current_user(req) {
    if (req.session.user_id) {
        return {
            user_id: req.session.user_id
        }
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
    {

        req.session.user_id = /*сюда id запишем*/;
        res.send(JSON.stringify({
            success: true,
            user: {
                user_id: req.session.user_id
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
};

function destroySession(req, res) {
    req.session.user_id = null;
    res.send(JSON.stringify({
        success: true
    }));
};
