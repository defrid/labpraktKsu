var url = require('url');

// import express
var express = require('express');
var cookieParser = require('cookie-parser');

//var adminBase = require('./base/admin-base');


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

    router.get('/GetUserList', GetUserList);
    router.post('/GetUser', GetUser);
    router.post('/EditUser', EditUser);
    router.post('/SaveUser', SaveUser);
};

var list = [{
    id: 1,
    user_lastname: "Иванцов",
    user_name: "Иван",
    user_surname: "Иванович",
    email: "аврвар@",
    date_create: "",
    date_change: ""
}, {
    id: 2,
    user_lastname: "Ровамнов",
    user_name: "Роман",
    user_surname: "Рованович",
    email: "пврвр@",
    date_create: "",
    date_change: ""
}];

//request - запрос, response - что мы в ответ пишем
function GetUserList(request, response) {
    //здесь на самом деле идёт обращение к базе, но пока так
    response.send(list);
}

function GetUser(request, response) {
    console.log(request.body);
    var user_id = request.body.user_id;

    var user = null;

    user = GetUserById(user_id); //тут на самом деле обращение к базе

    if (user) //если пользователь нашелся(не null)
        response.send(user);
    else {
        response.status(500); //код ошибки
        response.send({
            error: "User not found"
        });
    }
}

function EditUser(request, response) {
    var editedUser = request.body;

    var result = SaveUserById(editedUser);

    if (result) //если база сказала ИСТИНА, дала добро, значит всё успешно сохранилось
        response.send(200);
    else
        response.send(500);
}


function SaveUser(request, response) {
    var newUser = request.body;

    var result = CreateUser(newUser);

    if (result > 0)
        response.send(200);
    else
        response.send(500);

}



//типа здесь база данных
function GetUserById(id) {
    //здесь идёт обращение к базе за юзером, поиск идёт по id
    for (var i = list.length - 1; i >= 0; i--) {
        if (list[i].id == id) {
            return list[i];
        }
    };
    //закончилось обращение к базе, в переменной usser находится то что вернула база
}


//типа здесь база данных
function SaveUserById(editedUser) {
    editedUser.date_change = new Date().toString();
    //здесь идёт обращение к базе за юзером, поиск идёт по id
    for (var i = list.length - 1; i >= 0; i--) {
        if (list[i].id == editedUser.id) {
            list[i] = editedUser;
            return true;
        }
    };
    return false;
    //закончилось обращение к базе, в переменной usser находится то что вернула база
}


//база, возвращает id новог пользовтеля или -1
function CreateUser(user) {
    user.date_create = new Date();

    user.id = list.length + 1;

    return list.push(user);


}
