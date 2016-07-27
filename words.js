var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');


function wordsDAO(database) {
    "use strict";

    this.db = database;

    this.getWords = function(category, page, itemsPerPage, callback) {

        
        callback(pageItems);
    }

    this.getNumItems = function(category, callback) {
        "use strict";

        var numItems = 0;

        callback(numItems);
    }
}


module.exports.ItemDAO = wordsDAO;