var MongoClient = require("mongodb").MongoClient;
var url = 'mongodb://localhost:27017/project3';
var http = require('http');
var assert = require('assert');
var ObjectId = require('mongodb').ObjectId;

var getPosts = function(db, callback) {
	var cursor = db.collection('posts').find(); 
	cursor.each(function(err, doc) {
		assert.equal(err, null);
		if (doc != null) {
			console.dir(doc);
		}
		else {
			callback();
		}
	});
	// console.log(cursor);?
}

MongoClient.connect(url, function(err, db){
	assert.equal(err, null);
	getPosts(db, function() {
		db.close()
	});
});