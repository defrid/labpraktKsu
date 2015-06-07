var pg = require("pg");

var connectionString = process.env.DATABASE_URL || 'postgres://postgres:123@localhost:5432/postgres';

/*
user
    login
    password
    lastname
    name
    surname
    email
    type
*/


function RegisterUser(user, callback, errorCallback) {
    var client = new pg.Client(connectionString);
    client.connect();

    client.query('INSERT INTO users (user_lastname, user_name, user_surname, email, user_type, group_id)' +
        'VALUES ($1, $2 ,$3, $4, $5, $6) RETURNING id', [user.user_lastname, user.user_name, user.user_surname, user.email, user.user_type, user.group_id],
        function(err, result) {
            if (err) {
                console.error('error running query', err);
                return errorCallback(err);
            }

            //callback(result.rows);
            var user_id = result.rows[0].id;
            var curCallback;
            if (user.user_type == 1) {
                curCallback = (function () {
                    var counter = 0;
                    console.log(counter);

                    return function (result) {
                        counter++;

                        if (counter == 2) {

                            callback(result);
                        }
                    }
                })();
                InsertIntoStudentsTable(user_id, user.group_id, curCallback, errorCallback);
            } else {
                curCallback = callback;
            }

            InsertIntoAuthTable(user_id, user.login, user.password, curCallback, errorCallback);


            client.end();
        });
}


function InsertIntoAuthTable(user_id, login, password, callback, errorCallback) {
    var client = new pg.Client(connectionString);
    client.connect();

    client.query('INSERT INTO auth VALUES($1, $2, $3)', [user_id, login, password], function(err, result) {
        if (err) {
            console.error('error running query', err);
            return errorCallback(err);
        }

        callback({
            user_id: user_id
        });
        client.end();
    });
}

function InsertIntoUsersTable(user, callback, errorCallback) {
    var client = new pg.Client(connectionString);
    client.connect();

    client.query('INSERT INTO users (user_lastname, user_name, user_surname, email, user_type)' +
        'VALUES ($1, $2 ,$3, $4, $5) RETURNING id', [user.user_lastname, user.user_name, user.user_surname, user.email, user.user_type], function(err, result) {
        if (err) {
            console.error('error running query', err);
            return errorCallback(err);
        }

        callback({
            user_id: user_id
        });
        client.end();
    });
}

function InsertIntoStudentsTable(user_id, group_id, callback, errorCallback) {
    var client = new pg.Client(connectionString);
    client.connect();

    client.query('INSERT INTO stud VALUES($1, $2)', [user_id, group_id], function(err, result) {
        if (err) {
            console.error('error running query', err);
            return errorCallback(err);
        }

        callback({
            user_id: user_id
        });
        client.end();
    });
}

function GetGroup(callback, errorCallback) {
    var client = new pg.Client(connectionString);
    client.connect();

    client.query('SELECT * FROM stud_group', function(err, result) {
        if (err) {
            console.error('error running query', err);
            return errorCallback(err);
        }

        callback(result.rows);
        
        
        client.end();
    });
}



exports.RegisterUser = RegisterUser;
exports.GetGroup = GetGroup;