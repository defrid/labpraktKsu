var pg = require("pg");


var connectionString = process.env.DATABASE_URL || 'postgres://admin:qwerty@localhost:5432/main_database';

var client = new pg.Client(connectionString);
client.connect();

client.query('SELECT * from users', function(err, result) {
    //call `done()` to release the client back to the pool
    if(err) {
        return console.error('error running query', err);
    }
    console.log(result.rows);
    //output: 1
});
