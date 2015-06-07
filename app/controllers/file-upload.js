/*
  Module for file uploading;
  Usage:
    fileUpload = require('...file-uplaod')(



 */
// import express
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
    router.post('/GetFileIdForRating', GetFileIdForRating);
    router.post('/EditRatingFile', EditRatingFile);
};


function fileUpload(req, res) {
    /*var sendResponse = (function() {
        var count = 0;
        var result = null;
        return function(data) {
            count++;
            result = data || result;
            if (count == 2) {
                
            }
        }
    })();
    */
    var file_container = {
        file_data: null
    };

    if (req.busboy) {
        req.pipe(req.busboy);
        //когда срабатывает эта функция в field только file_name
        req.busboy.on('file', function(fieldname, file, field, filename, encoding, mimetype) {

            var saveTo = path.join(os.tmpDir(), path.basename(fieldname));

            file.setEncoding('hex');

            var result = "";

            file.on('data', function(data) {
                result += data;
            });

            file.on('end', function() {
                file_container.file_data = '\\x' + result;
            });



        });
        req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
            //console.log(key, value);//поля еще читаются, когда файл уже пишется
            file_container[key] = value;
        });
        req.busboy.on('finish', function() {
            uploadFile.fileUpload(file_container, function(result) {
                res.send(result);
            }, function(err) {
                res.send(500);
            });

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


function GetFileById(req, res) {
    var file_id = req.body.file_id;

    uploadFile.GetFileById(file_id, function(result) {
        var buf = new Buffer(result.file_data.substr(2), 'hex');
        res.send(buf);


    }, function(err) {
        res.send(500);
    });
}

/*
function GetSubjectById(req, res) {
    var subject_id = req.body.subj_id;
    console.log(subject_id);

    uploadFile.GetSubjectById(subject_id, function(result) {
        
        res.send(result);
    }, function(err) {
        res.send(500);
    });
}
*/

function EditRatingFile(req, res) {
    var comment_teacher = req.body.comment_teacher;
    var rating_type = req.body.rating;
    var file_id = req.body.file_id;
    console.log(comment_teacher);
    uploadFile.EditRatingFile(comment_teacher, rating_type, file_id, function(result) {
        //console.log(result);
        res.send(result);
    }, function(err) {
        res.send(500);
    });
}


function GetFileIdForRating(req, res) {
    var file_id = req.body.file_id;
    //console.log(file_id);
    uploadFile.GetFileIdForRating(file_id, function(result) {
        //console.log(result);
        res.send(result);
    }, function(err) {
        res.send(500);
    });
}
