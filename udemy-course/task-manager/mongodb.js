const mongodb = require('mongodb');

const connectionURL = 'mongodb://root:password@127.0.0.1:27017';
const databaseName = 'task-manager';

const MongoClient = new mongodb.MongoClient(connectionURL);

MongoClient.connect((error, client) => {
    if (error) {
        console.log("Unnable to connect to database");
        return;
    }

    const db = client.db(databaseName);
    console.log("Connected");
    // db.collection('users').updateOne({
    //     _id: new mongodb.ObjectId('62ac76db6df04bb3635af1dd')
    // }, {
    //     $inc: {
    //         age: 1
    //     }
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // });
});