// server

var MongoClient = require("mongodb").MongoClient;
var url = 'mongodb://localhost:27017/project3';
var http = require('http');
var assert = require('assert');
var ObjectId = require('mongodb').ObjectId;

var server = http.createServer(function(req, res) {

	// cors
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept') 
	res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	
	// get
	if (req.method == "GET") {
		console.log("GET");
		getPosts(function(results) {
			res.end(JSON.stringify(results));
		});
		// res.end("Sanity: Node response reaching browser");
	}
})

// db connection

var getPosts = function(callback) {
	console.log("Sanity: getPosts called")
	MongoClient.connect(url, function(err, db) {
		assert.equal(err, null);
		// console.log("Connected to a db");
		var cursor = db.collection("posts").find().toArray(function(error, results){
			callback(results)
		});
		/*
		cursor.each(function(err, doc){
				assert.equal(null, err);
				if (doc!==null){
					callback(doc);
					// posts.push(doc)
			}
		})
*/

		// console.dir(posts);
		// db.close(); // when to close the db?
	});
}
/*

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

var dbPosts = function() {
	MongoClient.connect(url, function(err, db){
		assert.equal(err, null);
		getPosts(db, function() {
			db.close()
		});
	});
};
*/
// server listen

server.listen(8080)

/*

Server / DB Patterns: http://blog.ijasoneverett.com/2013/03/a-sample-app-with-node-js-express-and-mongodb-part-1/



DBProvider = {}
DBProvider.prototype.findAll = function(callback) {}
	db.collection("col").find().toArray(function(error, results{
		if error: callback(error)
		else callback(null, results)	
	}))

callback function (error, results)

DBProvider.findall(function(error, results){
	// send results
})

*/