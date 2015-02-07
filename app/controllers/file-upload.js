/*
  Module for file uploading;
  Usage:
    fileUpload = require('...file-uplaod')(



 */

var url = require('url');
var request = require('request')

// import express
var express = require('express');
var cookieParser = require('cookie-parser');

// create an express app
// var app = express();
// import path utilities
// var path = require('path');

// import logger
var logger = require('morgan');

// import filesystem
var fs = require('fs');

// import post stream parser
var busboy = require('connect-busboy');

// var cql = require('node-cassandra-cql');
// var cql = require('cassandra-driver');

// to send file to another service;
var http = require('http');

var server = null;
var config = null;
var authProvider = null;
var clientOptions = null;

// {unique_id: {maxval: maxvalue, value: value}, ...}
var clientList = {};

// conf - nconf.get('file-upload') - the root for our module with
// some configuration or empty for defaults;
// expressApp - is an express application where we will add some routes;
// baseref - baseref for our module, i.e. '/files'; we will prepend this
// baseref to all our routes (for uploading and getting different data);
module.exports = function(conf) {
    config = conf;
    var router = express.Router();
    createRoutes(router);
    return router;
};

function createRoutes(router) {

    // initCql();

    router.use(cookieParser());
    router.use(busboy());

    /* router.get('/', function(req, res) {
      getFilesList(res);
    }); */

    router.post('/fileupload', fileUpload);
    router.get('/fileupload', fileUploadGet);
    /*router.get('/file/:id', function(req, res) {
      getFile(res, req.params.id);
    });

    router.get('/delete/:id', deleteFile);*/
    router.post('/retrievedata', retrieveData);
};


function generateGUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
    });
}

function retrieveData(req, res) {

}

var count = 0;

function fileUploadGet(req, res) {
    setTimeout(function() {
        var result = {
            ETA: (2 - count) + 'm',
            progress: 50 * count,
            Size: "5MB",
            Items: count * 10,
            status: "processing"
        }
        if (count == 2) {
            result.end = 1;
            result.status = "Complete!";
            res.json(result);
            count = 0;
            return;
        }
        res.json(result);
        count++;
    }, 1000)
}

function fileUpload(req, res) {
    //req.pipe(request.post('http://192.168.72.165:8080/api/v1/FDM'));
    if (req.busboy) {
        req.pipe(req.busboy);
        req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
            console.log(filename)
                /*file.pipe(request.post('http://192.168.72.165:8080/api/v1/FDM')
                    .on('data', function(data) {
                        console.log(data.toString().slice(-36));
                        res.set({
                            'Content-Type': 'text/plain',
                        });
                        res.json({
                            guid: data.toString().slice(-37, 1)
                        });
                    }));*/
            file.on('data', function(data) {
                console.log(data.toString().slice(-36));
                res.set({
                    'Content-Type': 'text/plain',
                });
                res.json({
                    guid: data.toString().slice(-37, 1)
                })
            });

        });
        req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
            console.log(key, value);
        });
        req.busboy.on('finish', function(field) {

        });
    }
}