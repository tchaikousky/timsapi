const host = 'drona.db.elephantsql.com';
const user = 'gmsgwuyr';
const password = 'tqRVvnOXPMjwqpTk5yD6yPuImSs6NfYh';
const database = 'gmsgwuyr';

const options = {
    host: host,
    user: user,
    password: password,
    database: database
}

const pgp = require('pg-promise')({
    query: function(e){
        console.log('query: ', e.query);
    }
})

const db = pgp(options);

module.exports = db;