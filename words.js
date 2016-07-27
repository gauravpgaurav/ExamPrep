var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');


function wordsDAO(database) {
    "use strict";

    this.db = database;

    this.getCategories = function(callback) {
        "use strict";

        var cursor = this.db.collection("item").aggregate([{$group: {"_id":"category", total : {$sum : 1}}}]);

        var categories = [];
        var category = {
            _id: "All",
            num: 9999
        };

        categories.push(category)
        callback(categories);
    }


    this.getWords = function(category, page, itemsPerPage, callback) {
        "use strict";

        var pageItem = this.createDummyItem();
        var pageItems = [];
        for (var i=0; i<5; i++) {
            pageItems.push(pageItem);
        }
        callback(pageItems);
    }


    this.getNumItems = function(category, callback) {
        "use strict";

        var numItems = 0;

        callback(numItems);
    }


    this.searchItems = function(query, page, itemsPerPage, callback) {
        "use strict";
        var cursor = this.db.collection("item").find({$text:{$search:query}}).sort({"_id":1}).skip((page)*itemsPerPage).limit(itemsPerPage);
        //console.log('cursor', cursor);
        cursor.each(function(err, data) {
            if(data != null) {
                console.log('data', data);
                callback(data);
            }
            else {
                console.log('err', err);
                callback(err);
            }
        });
    }


    this.getNumSearchItems = function(query, callback) {
        "use strict";

        var numItems = this.db.collection("item").find({$text:{$search:query}}).count();
        callback(numItems);
    }


    this.getItem = function(itemId, callback) {
        "use strict";
        var cursor = this.db.collection("item").find({"_id":itemId});
        cursor.each(function(err, data) {
            if(data != null)
                callback(data);
        });
    }


    this.getRelatedItems = function(callback) {
        "use strict";

        this.db.collection("item").find({})
            .limit(4)
            .toArray(function(err, relatedItems) {
                assert.equal(null, err);
                callback(relatedItems);
            });
    };


    this.addReview = function(itemId, comment, name, stars, callback) {
        "use strict";
        var reviewDoc = {
            name: name,
            comment: comment,
            stars: stars,
            date: Date.now()
        }

        var doc = this.createDummyItem();
        doc.reviews = [reviewDoc];

        callback(doc);
    }


    this.createDummyItem = function() {
        "use strict";

        var item = {
            _id: 1,
            title: "Gray Hooded Sweatshirt",
            description: "The top hooded sweatshirt we offer",
            slogan: "Made of 100% cotton",
            stars: 0,
            category: "Apparel",
            img_url: "/img/products/hoodie.jpg",
            price: 29.99,
            reviews: []
        };

        return item;
    }
}


module.exports.ItemDAO = wordsDAO;