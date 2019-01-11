
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/portifolize_db";

MongoClient.connect(url, {useNewUrlParser: true } ,(err, db) => {
    if (err) throw err;
    console.log("Connected Database");
    db.close();
});

