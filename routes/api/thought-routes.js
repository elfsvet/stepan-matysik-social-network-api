const router = require('express').Router();



const {createThought, getAllThought, getThoughtById} = require('../../controllers/thought-controller')

router
.route('/')
.get(getAllThought)
.post(createThought)

router
.route('/:id')
.get(getThoughtById)


//! /api/users/:userId/friends/:friendId




module.exports = router;