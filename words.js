var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');


function wordsDAO(database) {
    "use strict";
    this.db = database;

    this.getWords = function(page, itemsPerPage, callback) {
        var words = [];
        var options = {
            "limit": itemsPerPage,
            "skip": page*itemsPerPage,
            "sort": "level"
        };
        var cursor =this.db.collection('words').find({}, options);
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

    this.getSortedWords = function(page, itemsPerPage, callback) {
        var words = [];
        var options = {
            "limit": itemsPerPage,
            "skip": page*itemsPerPage,
            "sort": "word"
        };
        var cursor =this.db.collection('words').find({}, options);
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

    this.searchWords = function(query, page, itemsPerPage, callback) {
        this.db.collection('words').find( { $text : {$search : query}  } , {score : { $meta: "textScore" } })
            .sort( { score: { $meta: "textScore" } } ), function (err, data) {
            callback(data);
        };
    }

    this.getNumSearchWords = function(query, callback) {
        "use strict";
        this.db.collection('words').find().count(function (err, count) {
            callback(count.length);
        });
    }
}


module.exports.wordsDAO = wordsDAO;