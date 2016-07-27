var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');


function wordsDAO(database) {
    "use strict";
    this.db = database;

    this.getWords = function(page, itemsPerPage, callback) {
        var words;
        var cursor =this.db.collection('words').find();
        cursor.each(function(err, doc) {
            assert.equal(err, null);
            if (doc != null) {
                words = doc;
            } else {
                //callback(null);
            }
        });
        console.log(words);
        callback(words);
    }

    this.getNumWords = function(callback) {
        "use strict";

        var wordsCount = 0;

        callback(wordsCount);
    }
}


module.exports.wordsDAO = wordsDAO;