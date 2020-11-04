const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
require('dotenv').config()

// url connection
const url = process.env.MONGO_URL;
// Database Name
const dbName = process.env.MONGO_DB_NAME;
// collection
const collectionName = 'note'


/*
** get note(s)
*/

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

getNoteFilter = (res, columnFilter) => {
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
** insert note
*/

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

/*
** update note
*/

// ? filter by _id not work

const updateDocumentContent = function (db, pTitle, pContent, callback) {
  const collection = db.collection(collectionName);
  
  collection.updateOne({ title : pTitle }
    , { $set: { content: pContent } }, function(err, result) {
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

updateNote = (pTitle, pContent) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
    assert.strictEqual(null, err);
    const db = client.db(dbName);
    
    updateDocumentContent(db, pTitle, pContent, function () {
      client.close();
    });
  });
}

updateNoteTitle = (pTitle) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
    assert.strictEqual(null, err);
    const db = client.db(dbName);
    
    updateDocumentTitle(db, pTitle, function () {
      client.close();
    });
  });
}


/*
** delete note
*/

const removeDocument = function(db, pTitle, callback) {
  // Get the documents collection
  const collection = db.collection(collectionName);
  // Delete document where a is 3
  collection.deleteOne({ title: pTitle }, function(err, result) {
    assert.strictEqual(err, null);
    callback(result);
  });
}

deleteNote = (pTitle) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
    assert.strictEqual(null, err);
    const db = client.db(dbName);

    removeDocument(db, pTitle, function () {
      client.close();
    });
  });
}


exports.getNote = getNote;
exports.getNoteFilter = getNoteFilter;

exports.insertNote = insertNote;

exports.updateNote = updateNote;
exports.updateNoteTitle = updateNoteTitle;

exports.deleteNote = deleteNote;