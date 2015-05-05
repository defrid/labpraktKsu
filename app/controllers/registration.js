var express = require('express');

var registrationBase = require('./base/registration-base');



module.exports = function(conf) {
    config = conf;
    var router = express.Router();
    createRoutes(router);
    return router;
};

function createRoutes(router) {
    router.post('/registerUser', registerUser);
    router.get('/GetGroup', GetGroup);
};

function registerUser(request, response) {
    var user = request.body;

    registrationBase.RegisterUser(user, function(result) {
        response.send(result);
    }, function(err) {
        response.send(500);
    });
};

function GetGroup(request, response) {
    registrationBase.GetGroup(function(result) {
        response.send(result);
    }, function(err) {
        response.send(500);
    });
};

/*var user = {
    login: "login",
    password: "password",
    user_lastname: "user_lastname",
    user_name: "user_lastname",
    user_surname: "user_lastname",
    email: "user_lastname",
    user_type: 2,
    //group_id: 1
}*/