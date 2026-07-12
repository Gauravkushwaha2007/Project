const express = require('express')
const { body } = require('express-validator')
const router = express.Router()

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('name').isLength({min: 3}).withMessage('Name must be greater than 3 letters'),


])


module.exports = router;