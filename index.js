// PULLED FROM MEDIUM ARTICLE:: https://medium.com/@erasmuss22/subscribing-to-the-salesforce-streaming-api-from-node-js-cf99b7db5394
const jsforce = require('jsforce');
// env vars
require('dotenv').config();

const conn = new jsforce.Connection();

// Watches inserts from https://workbench.developerforce.com/insert.php (or sales force proper)

conn.login( process.env.USER_NAME, process.env.USER_PASS + process.env.SECURE_TOKEN, function(err, res) {
    if (err) {
        return console.error(err);
    }
    console.log('Authenticated');
    conn.streaming.topic("InvoiceStatementUpdates").subscribe(function(message) {
        console.log('Event Type : ' + message.event.type);
        console.log('Event Created : ' + message.event.createdDate);
        console.log('Object Id : ' + message.sobject.Id);
        console.log('Event : ' + JSON.stringify(message));
    });
});