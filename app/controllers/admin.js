var url = require('url');

// import express
var express = require('express');
var cookieParser = require('cookie-parser');

var adminBase = require('./base/admin-base');



// import filesystem
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
    router.post('/GetUser', GetUser);
    router.post('/EditUser', EditUser);
    router.post('/SaveUser', SaveUser);
    router.post('/getPagedList', GetPagedList);
    router.post('/RemoveUser', RemoveUser);
};

function GetUser(request, response) {
    var user_id = request.body.user_id;

    adminBase.GetUserById(user_id, function(result) {
        response.send(result);
    }, function(err) {
        response.send(500);
    });
}

function EditUser(request, response) {
    var editedUser = request.body;

    adminBase.SaveUser(editedUser, function(result) {
        response.send(result);
    }, function(err) {
        response.send(500);
    });
}

function RemoveUser(request, response) {
    var user_id = request.body.user_id;
    adminBase.RemoveUser(user_id, function(result) {
        response.send({
            success: result
        });
    }, function(err) {
        response.send(500);
    });
}


function SaveUser(request, response) {
    var newUser = request.body;

    adminBase.CreateUser(newUser, function(result) {
        response.send(result);
    }, function(err) {
        response.send(500);
    });
}

//универсальная функция, которая принимает страницу и количество
//и возвращает обратно список на текущую страницу
function GetPagedList(request, response) {
    var body = request.body;

    adminBase.GetPagedList(body.count, body.curPage,
        function(result) {
            var res = {
                curPage: body.curPage,
                count: body.count,
                lastPage: Math.round(result.count / body.count - 1),
                list: result.rows
            };

            response.send(res);
        },
        function(err) {
            response.send(500);
        });
}
