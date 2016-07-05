var bourne = require('bourne');
var router = require('express').Router();
var bodyParser = require('body-parser');
var session = require('express-session');

var personDB = new bourne('person.json');

router.use(function(req,res,next){
	if(!req.user) req.user = {id: 1};
	next();
});

router.use(bodyParser.json())
	/*.get('/',function(req,res){
		res.sendStatus(403);
	})*/
	.get('/person',function(req, res){
		personDB.find({userId: String(req.user.id)},
		function(err,data){
			console.log(req.session.id);
			res.json(data);
		});
	})
	.post('/person',function(req, res){
		var person = req.body;
		person.userId = req.body.id;
		personDB.insert(person,function(err,data){
			res.json(data);
		});
	});

router
	.param('id',function(req,res,next,id){
		req.dbQuery = {id:parseInt(id,10)};
		console.log(req.dbQuery);
		next();
	})
	.route('/person/:id')
	.get(function(req,res){
		personDB.findOne(req.dbQuery,function(err,data){
			console.log(data);
			res.json(data);
		});
	})
	.put(function(req,res){
		var person = req.body;
		personDB.update(req.dbQuery,person,function(err,data){
			res.json(data[0]);
		});
	})
	.delete(function(req,res){
		personDB.delete(req.dbQuery,function(err,data){
			res.json(null);
		});
	});

module.exports = { router:router, session:session };