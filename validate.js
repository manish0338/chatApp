var router = require('express').Router();

router.use(function(req,res,next){
	if(req.user){
		console.log(req.user);
		next();
	}else{
		res.sendStatus(401);
	}
});


module.exports = router;