var pg = require("pg");


var connectionString = process.env.DATABASE_URL || 'postgres://postgres:123@localhost:5432/postgres';

function GetUserFromBase(request, response){
var client = new pg.Client(connectionString);
client.connect();

client.query('SELECT * from users', function(err, result) {
    //call `done()` to release the client back to the pool
    if(err) {
        return console.error('error running query', err);
    }
    response.send(result);
    //output: 1
});
}

  