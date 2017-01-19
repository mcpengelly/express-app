var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.find({}, {}, function(e, docs){
        res.json(docs);
    });
});

router.post('/', function(req, res, next){
	var db = req.db;
	var username = req.query.username;
	var password = req.query.password;
	var email = req.query.email;

	var collection = db.get('userlist');
	var user = {
		username: username,
		password: password,
		email: email
	};

	collection.insert(user);

	res.send('Successfully inserted:', user);
});

router.delete('/', function(req, res, next){
	var db = req.db;
	var collection = db.get('userlist');
	collection.remove({});
	res.send('cleared all users')
})

module.exports = router;
