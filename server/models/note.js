const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
require('dotenv').config()

// Connection url
const url = process.env.MONGO_URL;
// Database Name
const dbName = process.env.MONGO_DB_NAME;

const collectionName = 'note'

const insertDocuments = function (db, title, content, callback) {
  // Get the documents collection
  const collection = db.collection(collectionName);
  // Insert some documents
  collection.insertMany([
    { title: title, content: content }
  ], function (err, result) {
    assert.strictEqual(err, null);
    callback(result);
  });
}

getNote = (res) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {

    // get user collection
    const col = client.db(dbName).collection(collectionName);

    // List all the available databases
    col.find({}).toArray(function (err, items) {
      assert.strictEqual(null, err);
      assert.ok(items.length > 0);

      res.status(200).send(items);
      client.close();
    });
  });
}

insertNote = (title, content) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
    assert.strictEqual(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    insertDocuments(db, title, content, function () {
      client.close();
    });
  });
}

exports.getNote = getNote;
exports.insertNote = insertNote;