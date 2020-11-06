const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
require('dotenv').config()

// url connection
const url = process.env.MONGO_URL;
// Database Name
const dbName = process.env.MONGO_DB_NAME;
// collection
const collectionName = 'todo'


/*
** get todo(s)
*/

getTodo = (res) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {

    // get user collection
    const col = client.db(dbName).collection(collectionName);
    
    // List all the available databases
    col.find({}).toArray(function (err, items) {
      assert.strictEqual(null, err);
      if (items.length <= 0) {
          res.status(200).send("0");
      } else {
          res.status(200).send(items);
      }
      client.close();
    });
  });
}

getTodoFilter = (res, columnFilter) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
    
    // get user collection
    const col = client.db(dbName).collection(collectionName);
    
    // List all the available databases
    col.find({title: columnFilter}).toArray(function (err, items) {
      assert.strictEqual(null, err);
      assert.ok(items.length > 0);
      
      res.status(200).send(items);
      client.close();
    });
  });
}

/*
** insert todo
*/

const insertDocuments = function (db, title, isCheck, callback) {
  // Get the documents collection
  const collection = db.collection(collectionName);
  // Insert some documents
  collection.insertMany([
    { title: title, check: isCheck }
  ], function (err, result) {
    assert.strictEqual(err, null);
    callback(result);
  });
}

insertTodo = (title, isCheck) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
    assert.strictEqual(null, err);
    
    const db = client.db(dbName);

    insertDocuments(db, title, isCheck, function () {
      client.close();
    });
  });
}

/*
** update todo
*/

// ? filter by _id not work

const updateDocumentIsCheck = function (db, pTitle, pCheck, callback) {
  const collection = db.collection(collectionName);
  
  collection.updateOne({ title : pTitle }
    , { $set: { check: pCheck } }, function(err, result) {
    assert.strictEqual(err, null);
    callback(result);
  });
}

const updateDocumentTitle = function (db, pTitle, callback) {
  const collection = db.collection(collectionName);
  
  collection.updateOne({ title : pTitle }
    , { $set: { title: pTitle } }, function(err, result) {
    assert.strictEqual(err, null);
    callback(result);
  });
}

updateTodo = (pTitle, pCheck) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
    assert.strictEqual(null, err);
    const db = client.db(dbName);
    
    updateDocumentIsCheck(db, pTitle, pCheck, function () {
      client.close();
    });
  });
}

updateTodoTitle = (pTitle) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
    assert.strictEqual(null, err);
    const db = client.db(dbName);
    
    updateDocumentTitle(db, pTitle, function () {
      client.close();
    });
  });
}


/*
** delete todo
*/

const removeDocument = function(db, pTitle, callback) {
  // Get the documents collection
  const collection = db.collection(collectionName);
  // Delete document
  collection.deleteOne({ title: pTitle }, function(err, result) {
    assert.strictEqual(err, null);
    callback(result);
  });
}

deleteTodo = (pTitle) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
    assert.strictEqual(null, err);
    const db = client.db(dbName);

    removeDocument(db, pTitle, function () {
      client.close();
    });
  });
}


exports.getTodo = getTodo;
exports.getTodoFilter = getTodoFilter;

exports.insertTodo = insertTodo;

exports.updateTodo = updateTodo;
exports.updateTodoTitle = updateTodoTitle;

exports.deleteTodo = deleteTodo;