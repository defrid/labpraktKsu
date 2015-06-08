var pg = require("pg");

var connectionString = process.env.DATABASE_URL || 'postgres://postgres:123@localhost:5432/postgres';




function CheckLoginPass(login, password, callback, errorCallback) {
    var client = new pg.Client(connectionString);
    client.connect();

    client.query('SELECT auth.user_id, users.user_type FROM auth, users WHERE auth.login = $1 AND auth.pass = $2 AND auth.user_id = users.id;', [login, password], function(err, result) {
        if (err) {
            console.error('error running query', err);
            return errorCallback(err);
        }

        if(result.rows.length == 0) {
            return errorCallback("Неверный логин или пароль");
        }

		console.log(result.rows);

        callback(result.rows[0]);


        client.end();
    });
}



exports.CheckLoginPass = CheckLoginPass;
