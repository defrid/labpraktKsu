var pg = require("pg");

var connectionString = process.env.DATABASE_URL || 'postgres://postgres:123@localhost:5432/postgres';




function CheckLoginPass(login, password, callback, errorCallback) {
    var client = new pg.Client(connectionString);
    client.connect();

    client.query('SELECT user_id FROM auth WHERE auth.login = $1 AND auth.pass = $2;', [login, password], function(err, result) {
        if (err) {
            console.error('error running query', err);
            return errorCallback(err);
        }

        if(result.rows.length == 0) {
            return errorCallback("Неверный логин или пароль");
        }

        callback(result.rows[0].user_id);
        

        client.end();
    });
}



exports.CheckLoginPass = CheckLoginPass;
