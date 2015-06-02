var url = require('url');

// import express
var express = require('express');
var cookieParser = require('cookie-parser');

var adminBase = require('./base/admin-base');

var uploadFilesBase = require('./base/upload-files-base');

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
    router.get('/GetSubjectList', GetSubjectList);
};

function GetSubjectList(req, res) {
    uploadFilesBase.GetSubjectList(function(result) {
        res.send(result);
    }, function(err) {
        res.send(500);
    });
};