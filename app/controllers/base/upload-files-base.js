var pg = require("pg");

var connectionString = process.env.DATABASE_URL || 'postgres://postgres:123@localhost:5432/postgres';


function GetSubjectList(callback, errorCallback) {
    var client = new pg.Client(connectionString);
    client.connect();

    client.query('SELECT * FROM subject', function(err, result) {
        if (err) {
            console.error('error running query', err);
            return errorCallback(err);
        }
        
        callback(result.rows);
        //console.log(callback);

        client.end();
    });
}


function fileUpload(result, fields, callback, errorCallback) {
    var client = new pg.Client(connectionString);
    client.connect();

    client.query(' insert into files (file_data, file_name) values ($1, $2)', [result, fields],
        function(err, writeResult) {
            if (err) {
                console.log('err', err, 'pg writeResult', writeResult);
                return errorCallback(err);
            }

            
            callback(result.rows);



            client.end();
        });
}


function GetFilePagedList(count, curPage, callback, errorCallback) {
    var client = new pg.Client(connectionString);
    client.connect();

    var query = 'SELECT * FROM files ' +
        'LIMIT $1 OFFSET $2';
    client.query(query, [count, curPage * count], function(err, result) {
        if (err) {
            console.error('error running query', err);
            return errorCallback(err);
        }

        GetFileCount(function(count) {
            var response = {
                count: count,
                rows: result.rows
            }
            callback(response);
        })
        client.end();
    });
}

function GetFileCount(callback) {
    var client = new pg.Client(connectionString);
    client.connect();

    client.query('SELECT COUNT(*) from files', function(err, result) {
        if (err) {
            console.error('error running query', err);
            return errorCallback(err);
        }

        callback(result.rows[0].count);
        client.end();
    });
}



function GetFileById(file_id, callback, errorCallback) {
    var client = new pg.Client(connectionString);
    client.connect();

    var query = 'SELECT * FROM files WHERE failes.id = $1;';

    client.query(query, [file_id], function(err, result) {
        if (err) {
            console.error('error running query', err);
            return errorCallback(err);
        }

        callback(result.rows[0]);
        client.end();
    });
}



function GetFileById(file_id, callback, errorCallback) {
    var client = new pg.Client(connectionString);
    client.connect();

    var query = 'SELECT * FROM files WHERE files.id = $1;';

    client.query(query, [file_id], function(err, result) {
        if (err) {
            console.error('error running query', err);
            return errorCallback(err);
        }

        callback(result.rows[0]);
        client.end();
    });
}


exports.GetSubjectList = GetSubjectList;
exports.fileUpload = fileUpload;
exports.GetFilePagedList = GetFilePagedList;
exports.GetFileById = GetFileById;

