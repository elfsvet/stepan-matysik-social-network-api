const router = require('express').Router();



const {createThought, getAllThought, getThoughtById, updateThought, deleteThought} = require('../../controllers/thought-controller')

router
.route('/')
.get(getAllThought)
.post(createThought)

router
.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought)


//! /api/users/:userId/friends/:friendId




module.exports = router;