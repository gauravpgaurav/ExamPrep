var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');


function wordsDAO(database) {
    "use strict";

    this.db = database;

    this.getWords = function(category, page, itemsPerPage, callback) {
        var words = [];
        var cursor =db.collection('words').find();
        cursor.each(function(err, doc) {
            assert.equal(err, null);
            if (doc != null) {
                console.dir(doc);
                words.add(doc);
            } else {
                callback();
            }
        });
        callback(words);
    }

    this.getNumItems = function(category, callback) {
        "use strict";

        var numItems = 0;

        callback(numItems);
    }
}


module.exports.wordsDAO = wordsDAO;