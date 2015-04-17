var pg = require("pg");


var connectionString = process.env.DATABASE_URL || 'postgres://postgres:123@localhost:5432/postgres';

function GetUserList(callback, errorCallback) {
    var client = new pg.Client(connectionString);
    client.connect();

    client.query('SELECT * from users', function(err, result) {
        if (err) {
            console.error('error running query', err);
            return errorCallback(err);
        }

        callback(result.rows);
        client.end();
    });
}

function GetUserCount(callback) {
    var client = new pg.Client(connectionString);
    client.connect();

    client.query('SELECT COUNT(*) from users', function(err, result) {
        if (err) {
            console.error('error running query', err);
            return errorCallback(err);
        }

        callback(result.rows[0].count);
        client.end();
    });
}

function GetPagedList(count, curPage, callback, errorCallback) {
    var client = new pg.Client(connectionString);
    client.connect();

    var query = 'SELECT * FROM users ' +
        'LIMIT $1 OFFSET $2';
    client.query(query, [count, curPage * count], function(err, result) {
        if (err) {
            console.error('error running query', err);
            return errorCallback(err);
        }

        GetUserCount(function(count) {
            var res = {
                count: count,
                rows: result.rows
            }
            callback(res);
        })
        client.end();
    });
}

function CreateUser(user, callback, errorCallback) {
    var client = new pg.Client(connectionString);
    client.connect();

    var query = 'INSERT INTO users (user_lastname, user_name, user_surname, email, date_create, date_change) VALUES ($1, $2 ,$3, $4, $5, $6) RETURNING id';

    client.query(query, [user.user_lastname, user.user_name, user.user_surname, user.email, user.date_create, user.date_change], function(err, result) {
        if (err) {
            console.error('error running query', err);
            return errorCallback(err);
        }

        var NewUser = {
            id: result.rows[0].id,
            user_lastname: user.user_lastname,
            user_name: user.user_name,
            user_surname: user.user_surname,
            email: user.email,
            date_create: user.date_create,
            date_change: user.date_change

        };

        callback(result);
        client.end();
    });
}


function GetUserById(user_id, callback, errorCallback) {
    var client = new pg.Client(connectionString);
    client.connect();

    var query = 'SELECT * FROM users WHERE users.id = $1;';

    client.query(query, [user_id], function(err, result) {
        if (err) {
            console.error('error running query', err);
            return errorCallback(err);
        }

        callback(result.rows[0]);
        client.end();
    });
}


function SaveUser(editedUser, callback, errorCallback) {
    var client = new pg.Client(connectionString);
    client.connect();

    var query = 'UPDATE users SET user_lastname = $2, user_name = $3, user_surname = $4, email= $5  WHERE users.id = $1;';

    client.query(query, [editedUser.id, editedUser.user_lastname, editedUser.user_name, editedUser.user_surname, editedUser.email  ], function(err, result) {
        if (err) {
            console.error('error running query', err);
            return errorCallback(err);
        }

        callback(result.rows[0]);
        client.end();
    });
}

function RemoveUser(user_id, callback, errorCallback) {
    var client = new pg.Client(connectionString);
    client.connect();

    var query = 'DELETE FROM users WHERE users.id = $1';
    client.query(query, [ user_id ], function(err, result) {
        if (err) {
            console.error('error running query', err);
            return errorCallback(err);
        }

        callback(true);
        client.end();
    });
}

exports.GetUserList = GetUserList;

exports.GetPagedList = GetPagedList;

exports.CreateUser = CreateUser;

exports.GetUserById = GetUserById;

exports.SaveUser = SaveUser;

exports.RemoveUser = RemoveUser;