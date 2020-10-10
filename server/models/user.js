const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
require('dotenv').config()

// Connection url
const url = process.env.MONGO_URL;
// Database Name
const dbName = process.env.MONGO_DB_NAME;

getUser = (res) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {

    // get user collection
    const col = client.db(dbName).collection('user');

    // List all the available databases
    col.find({}).toArray(function (err, items) {
      assert.strictEqual(null, err);
      assert.ok(items.length > 0);

      res.status(500).send(items);
      client.close();
    });
  });
}

exports.getUser = getUser;
