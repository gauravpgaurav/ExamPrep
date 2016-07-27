var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');


function wordsDAO(database) {
    "use strict";
    this.db = database;

    this.getWords = function(page, itemsPerPage, callback) {
        var words = [];
        var cursor =this.db.collection('words').find();
        cursor.each(function(err, doc) {
            assert.equal(err, null);
            if (doc != null) {
                words.push(doc);
            }
            else {
                callback(words);
            }
        });
    }

    this.getNumWords = function(callback) {
        "use strict";
        this.db.collection('words').find().count(function (err, count) {
            callback(count);
        });
    }
}


module.exports.wordsDAO = wordsDAO;