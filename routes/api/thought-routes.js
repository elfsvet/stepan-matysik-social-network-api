const router = require('express').Router();



const {createThought} = require('../../controllers/thought-controller')

router
.route('/')
.post(createThought)


//! /api/users/:userId/friends/:friendId




module.exports = router;