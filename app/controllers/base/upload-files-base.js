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

/*
function GetSubjectById(subject_id, callback, errorCallback) {
    var client = new pg.Client(connectionString);
    client.connect();

    client.query('SELECT subject_name FROM subject WHERE subject_id = $1', [subject_id], function(err, result) {
        if (err) {
            console.error('error running query', err);
            return errorCallback(err);
        }

        callback(result.rows);
        //console.log(callback);

        client.end();
    });
}*/


function fileUpload(file_container, callback, errorCallback) {
    var client = new pg.Client(connectionString);
    client.connect();

    client.query(' insert into files (user_id, subj_id, file_data, file_name) values ($1, $2, $3, $4)',
        [file_container.user_id, file_container.subj_id, file_container.file_data, file_container.file_name],
        function(err, writeResult) {
            if (err) {
                console.log('err', err, 'pg writeResult', writeResult);
                return errorCallback(err);
            }


            callback(writeResult.rows);



            client.end();
        });
}


function EditRatingFile(comment_teacher, rating_type, file_id, callback, errorCallback) {
    var client = new pg.Client(connectionString);
    client.connect();

    client.query(' UPDATE files SET comment_teacher = $1, rating_type = $2 WHERE files.file_id = $3',
        [comment_teacher, rating_type, file_id],
        function(err, writeResult) {
            if (err) {
                console.log('err', err, 'pg writeResult', writeResult);
                return errorCallback(err);
            }


            callback(writeResult.rows);



            client.end();
        });
}

function GetFileList(callback, errorCallback) {
    var client = new pg.Client(connectionString);
    client.connect();
    //вот здесь еще и фамилию тяни, с помощью join то есть еще переменную с запросом сделать?
    var query = 'SELECT file_id, subj_id, user_id, date_create_file, file_name, comment_teacher, rating_type, date_change_file, user_lastname FROM files INNER JOIN users ON files.user_id = users.id';
    client.query(query, function(err, result) {
        if (err) {
            console.error('error running query', err);
            return errorCallback(err);
        }


        callback(result.rows);

        client.end();
    });
}

function GetFilePagedList(count, curPage, callback, errorCallback) {
    var client = new pg.Client(connectionString);
    client.connect();
    //вот здесь еще и фамилию тяни, с помощью join то есть еще переменную с запросом сделать?
    var query = 'SELECT file_id, subj_id, user_id, date_create_file, file_name, comment_teacher, rating_type, date_change_file, user_lastname FROM files INNER JOIN users ON files.user_id = users.id LIMIT $1 OFFSET $2';
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

    var query = 'SELECT file_data FROM files WHERE file_id = $1';

    client.query(query, [file_id], function(err, result) {
        if (err) {
            console.error('error running query', err);
            return errorCallback(err);
        }

        //console.log(result.rows[0]);
        callback(result.rows[0]);
        client.end();
    });
}

function GetFileIdForRating(file_id, callback, errorCallback) {
    var client = new pg.Client(connectionString);
    client.connect();

    var query = 'SELECT file_id, subj_id, user_id, date_create_file, file_name, comment_teacher, rating_type  FROM files WHERE file_id = $1';

    client.query(query, [file_id], function(err, result) {
        if (err) {
            console.error('error running query', err);
            return errorCallback(err);
        }

        //console.log(result.rows[0]);
        callback(result.rows[0]);
        client.end();
    });
}

exports.GetSubjectList = GetSubjectList;
exports.EditRatingFile = EditRatingFile;
exports.fileUpload = fileUpload;
exports.GetFileList = GetFileList;
exports.GetFilePagedList = GetFilePagedList;
exports.GetFileById = GetFileById;
exports.GetFileIdForRating = GetFileIdForRating;
