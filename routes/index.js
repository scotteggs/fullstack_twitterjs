var express = require('express')

var router = express.Router()

// var tweetbank = require('../tweetbank')

var models = require('../models/index.js')


module.exports = router

// home
router.get('/', function(req, res, next) {

	models.Tweet.findAll({ include: [models.User] }).then(function (tweets) {
		console.log(JSON.stringify(tweets, null, 2))
		res.render('index', { tweets: tweets })
	})
});





// make a tweet
router.post('/', function(req, res, next) {
  // res.status(201).json(tweetbank.add(req.body.name, req.body.tweet))
  res.redirect('/')
})

// // getting a tweet from a user
// router.get('/users/:name', function(req, res, next) {
// 	models.User.findOne({where: {name: req.params.name}}).then(function (user) {
//     return user.getTweets();
// 	})
// 	.then(function (tweets) {
//     JSON.stringify(tweets); // another way of just logging the plain old values
// 	});
//    res.json(tweets)

//   //res.render('index', { tweets: tweets })
// })

//getting all tweets from a user
router.get('/users/:name', function(req, res, next) {
	var u;
	models.User.findOne({ where: {name: req.params.name}}).then(function (user) {
    u = user;
    console.log('user', user.get({plain: true}))
    return user.getTweets();
	})
	.then(function (tweets) {
		
		tweets = tweets.map(function (tweet) {
			var tweetObj = tweet.get({plain: true});
			tweetObj.User = u;
			return tweetObj;
		})
    //console.log('tweet', JSON.stringify(tweets))
    //JSON.stringify(tweets); // another way of just logging the plain old values
    //res.json(tweets)
    res.render('index', { tweets: tweets })
	});

  //
})




// get a single tweet
router.get('/users/:name/tweets/:id', function(req, res, next) {
  req.params.id = Number(req.params.id)
  var tweets = tweetbank.find(req.params)
  res.render('index',{ tweets: tweets})
})


