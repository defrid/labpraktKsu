/*
  Module for file uploading;
  Usage:
    fileUpload = require('...file-uplaod')(



 */
// import express
var express = require('express');
var cookieParser = require('cookie-parser');


// import filesystem
var fs = require('fs');

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
};


function fileUpload(req, res) {
    if (req.busboy) {
        req.pipe(req.busboy);
        req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
            console.log(file);
        });
        req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
            console.log(key, value);
        });
        req.busboy.on('finish', function(field) {
			res.send(200);
        });
    }
}
