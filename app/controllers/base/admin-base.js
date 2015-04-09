var pg = require("pg");


var connectionString = process.env.DATABASE_URL || 'postgres://postgres:123@localhost:5432/postgres';

function GetUserListFromBase(callback, errorCallback) {
    var client = new pg.Client(connectionString);
    client.connect();

    client.query('SELECT * from users', function(err, result) {
        if(err) {
            console.error('error running query', err);
            return errorCallback(err);
        }

        callback(result);
        client.end();
    });
}

function GetUserListFromBase(count, curPage, callback, errorCallback) {
    var client = new pg.Client(connectionString);
    client.connect();

    var query = 'SELECT * FROM users' +
            'LIMIT $1 OFFSET $2';

    client.query(query, [count, curPage * count], function(err, result) {
        if(err) {
            console.error('error running query', err);
            return errorCallback(err);
        }

        callback(result);
        client.end();
    });
}

exports.GetUserListFromBase = GetUserListFromBase;
