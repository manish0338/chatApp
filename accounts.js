var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var Bourne = require('bourne');
var crypto = require('crypto');

var router = express.Router();
var db = new Bourne('users.json');

function hash(password){
	return crypto.createHash('sha256').update(password).digest('hex');
}

router
	.use(bodyParser.json())
	.use(session({
  		secret: 'NeomaX',
  		resave: false,
  		saveUninitialized: true
		}))
	.get('/login',function(req,res){
		res.redirect('/');
	})
	.post('/login',function(req,res){
		var user = {
			username: req.body.username,
			password: hash(req.body.password)
		}

		db.findOne(user,function(err, data){
			if(data){
				req.session.userId = data.id;
				res.status(200).json({username: data.username});
			} else {
				res.status(401).send("Incorrect username or password");
			}
		});
	})
	.post('/register', function(req, res,next){

		var user = {
			username: req.body.username,
			password: hash(req.body.password)
		};

		db.find({username:user.username}, function(err, data){
			if(!data.length){
				db.insert(user, function(err, data){
					req.session.userId = data.id;
					res.status(201).send();
				});
			} else {
				res.redirect('/');
			}
		});
	})
	.get('logout', function(req, res){
		req.session.userId = null;
		res.redirect('/');
	})
	.use(function(req, res, next){
		if(req.session.userId){
			db.findOne({id: req.session.userId }, function(err, data){
				req.user = data;
			});
		}
		next();
	});

module.exports = router;	