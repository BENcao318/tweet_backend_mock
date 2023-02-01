const express = require('express')
const router = express.Router()
const users = require('../controller/user.controller')

router.post('/register', users.createUser)

router.post('/signin', users.signIn)

module.exports = router
