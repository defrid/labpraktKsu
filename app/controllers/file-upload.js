/*
  Module for file uploading;
  Usage:
    fileUpload = require('...file-uplaod')(



 */
// import express

var pg = require("pg");

var connectionString = process.env.DATABASE_URL || 'postgres://postgres:123@localhost:5432/postgres';

var express = require('express');
var cookieParser = require('cookie-parser');
var uploadFile = require('./base/upload-files-base');

var app = express();



// import filesystem
var fs = require('fs'),
    http = require('http'),
    path = require('path'),
    os = require('os');

// import post stream parser
var busboy = require('connect-busboy');


var config = null;


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
    router.use(cookieParser());
    router.use(busboy());

    router.post('/fileupload', fileUpload);
    router.post('/GetFilePagedList', GetFilePagedList);
    router.post('/GetFileById', GetFileById);


};


function fileUpload(req, res) {
    var sendResponse = (function() {
        var count = 0;
        var result = null;
        return function(data) {
            count++;
            result = data || result;
            if (count == 2) {
                res.send(result);
            }
        }
    })();

    if (req.busboy) {
        req.pipe(req.busboy);
        req.busboy.on('file', function(fieldname, file, fields, filename, encoding, mimetype) {
            // console.log('Проверка:', file);
            var saveTo = path.join(os.tmpDir(), path.basename(fieldname));

            file.setEncoding('hex');
            var result = "";

            file.on('data', function(data) {
                result += data;
            });

            file.on('end', function() {
                //  console.log('result:',result);

            });

            fs.readFile("file", 'hex', function(err, res) {
                result = '\\x' + result;
                console.log('result:', result);

                uploadFile.fileUpload(result, fields, function(result) {
                    sendResponse(result);
                }, function(err) {
                    sendResponse(500);
                });

            });



        });
        req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
            console.log(key, value);
        });
        req.busboy.on('finish', function() {

            sendResponse();

            console.log("Ну ок.");
        });
    }
};

function GetFilePagedList(req, res) {
    var body = req.body;

    uploadFile.GetFilePagedList(body.count, body.curPage, function(result) {

        var response = {
            curPage: body.curPage,
            count: body.count,
            lastPage: Math.ceil(result.count / body.count - 1),
            list: result.rows
        };

        res.send(response);
    }, function(err) {
        res.send(500);
    });
};


function GetFileById(request, response) {
    var file_id = request.body.file_id;

    uploadFile.GetFileById(file_id, function(result) {
        response.send(result);
    }, function(err) {
        response.send(500);
    });
}

