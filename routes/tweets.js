const express = require('express')
const router = express.Router()
const tweets = require('../controller/tweet.controller')

router.post('/new', tweets.createTweet)

router.get('/find', tweets.findTweet) // find tweets with the applied username

router.post('/update', tweets.updateTweet) // update tweet based on tweet id. only signed in user can operate

router.delete('/', tweets.deleteTweet) // delete tweet based on tweet id. only signed in user can operate

module.exports = router
