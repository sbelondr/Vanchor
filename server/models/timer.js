const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
require("dotenv").config();

// url connection
const url = process.env.MONGO_URL;
// Database Name
const dbName = process.env.MONGO_DB_NAME;
// collection
const collectionName = "timer";

/*
 ** get timer(s)
 */

getTimer = (res) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (
    err,
    client
  ) {
    // get user collection
    const col = client.db(dbName).collection(collectionName);

    // List all the available databases
    col.find({}).toArray(function (err, items) {
      assert.strictEqual(null, err);
      assert.ok(items.length > 0);

      res.status(200).send(items[0]);
      client.close();
    });
  });
};

/*
 ** update timer
 */

const updateDocument = function (db, pMode, pPomodoro, pTimer, callback) {
  const collection = db.collection(collectionName);

  collection.updateOne(
    {},
    { $set: { mode: pMode, pomodoro: pPomodoro, timer: pTimer} },
    function (err, result) {
      assert.strictEqual(err, null);
      callback(result);
    }
  );
};

updateTimer = (pMode, pPomodoro, pTimer) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (
    err,
    client
  ) {
    assert.strictEqual(null, err);
    const db = client.db(dbName);

    updateDocument(db, pMode, pPomodoro, pTimer, function () {
      client.close();
    });
  });
};


exports.getTimer = getTimer;

exports.updateTimer= updateTimer;
