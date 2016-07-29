var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');


function wordsDAO(database) {
    "use strict";
    this.db = database;

    this.getWord = function ( objId, callback) {
        var id = require('mongodb').ObjectID(objId);
        this.db.collection('words').find({'_id': id}).toArray(function (err, data) {
            callback(data[0]);
        });
    }

    this.getWords = function(page, itemsPerPage, callback) {
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

    this.getlevelWords = function(level, page, itemsPerPage, callback) {
        var words = [];
        var options = {
            "limit": itemsPerPage,
            "skip": page*itemsPerPage,
            "sort": "word"
        };
        var cursor =this.db.collection('words').find({"level": level}, options);
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

    this.getNumWordsLevel = function(level, callback) {
        "use strict";
        this.db.collection('words').find({"level": level}).count(function (err, count) {
            callback(count);
        });
    }
    this.searchWords = function(query, page, itemsPerPage, callback) {
        this.db.collection('words').find({
            "$text": {
                "$search": query
            }
        },{
            "$score": {
                $meta: "textScore"
            }
        }
        )
            //.sort({ score: { $meta: "textScore" } })
            .skip(page * itemsPerPage)
            .limit(itemsPerPage).toArray(function (err, data) {
            if (data.length == 0) {
                callback(null);
            }
            else {
                callback(data);
            }
        });

    }

    this.getNumSearchWords = function(query, callback) {
        "use strict";
        this.db.collection('words').find({
            "$text": {
                "$search": query
            }
        })
            .count(function (err, count) {
                callback(count);
            });
    }

    this.addWord = function(wordTitle, wordLevel, wordMeaning, wordExample, callback) {
        "use strict";
        this.db.collection('words').insertOne(
            {
                "word": wordTitle,
                "level": wordLevel,
                "meaning": wordMeaning,
                "example": wordExample,
                "synonym": ''
            }, function(err, results) {
                callback(results);
            });

    }

    this.updateWord = function(objId, wordTitle, wordLevel, wordMeaning, wordExample, callback) {
        "use strict";
        var wordId = require('mongodb').ObjectID(objId);
        this.db.collection('words').updateOne(
            { "_id" : wordId },
            {
                    "word": wordTitle,
                    "level": wordLevel,
                    "meaning": wordMeaning,
                    "example": wordExample,

            }, function(err, results) {
                callback(results);
            });

    }
}


module.exports.wordsDAO = wordsDAO;