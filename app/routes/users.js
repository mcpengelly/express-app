var express = require('express');
var router = express.Router();
var catnames = require('cat-names');
var count = 0;

// access all users
router.get('/', function(req, res, next) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.find({}, {}, function(e, docs){
        res.json(docs);
    });
});

// access a user via its id
router.get('/:id', function(req, res, next){
	var db = req.db;
	var collection = db.get('userlist');

	collection.find({ id: req.query.id }, {}, function(err, documents){
		res.send(documents);
	});
});

// create a user, optionally pass username, password, email
router.post('/', function(req, res, next){
	var db = req.db;
	var username = req.query.username || '';
	var password = req.query.password || '';
	var email = req.query.email || '';

	var collection = db.get('userlist');
	var user = {
		id: count,
		username: username,
		password: password,
		email: email
	};

	collection.insert(user);

	count++;
	res.send('Successfully inserted:', user);
});

// creates a random user
router.post('/random-user', function(req, res, next){
	var db = req.db;
	var username = catnames.random();
	var password = 'test';

	var collection = db.get('userlist');
	var user = {
		id: count,
		username: username,
		password: password
	};

	collection.insert(user);

	count++;
	res.send('Successfully inserted:', user);
});

// clears the database
router.delete('/', function(req, res, next){
	var db = req.db;
	var collection = db.get('userlist');
	collection.remove({});
	res.send('cleared all users')
});

module.exports = router;
