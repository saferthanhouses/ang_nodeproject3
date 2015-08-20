var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/test';
var ObjectId = require('mongodb').ObjectId;

// to return all documents in a colleection, call the find() method without a filter/query criteria

var findRestaurants = function(db, callback) {
	var cursor = db.collection('restaurants').find({"grades.score": { $gt: 30 }});
	cursor.each(function(err, doc) {
		assert.equal(err, null);
		if (doc != null) {
			console.dir(doc);
		}
		else {
			callback();
		}
	});
}

MongoClient.connect(url, function(err, db){
	assert.equal(err, null);
	findRestaurants(db, function() {
		db.close()
	});
});