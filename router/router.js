const express = require('express')
const router = express.Router()
const users = require('./../controllers/users')
const cases = require('./../controllers/cases')

//API's
router.use('/users', users)
router.use('/cases', cases)

module.exports = router