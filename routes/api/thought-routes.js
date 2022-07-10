const router = require('express').Router();



const { createThought, getAllThought, getThoughtById, updateThought, deleteThought, createReaction, deleteReaction} = require('../../controllers/thought-controller')

router
    .route('/')
    .get(getAllThought)
    .post(createThought)

router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)


    //! /api/thoughts/:thoughtId/reactions
router
.route('/:thoughtId/reactions')
// post to create a reaction stored in a single thought's reaction array field
.post(createReaction)

//! /api/thoughts/:thoughtId/reactions/:reactionId
router
.route('/:thoughtId/reactions/:reactionId')
// delete to pull and remove a reaction by the reaction's reactionId value
.delete(deleteReaction)


module.exports = router;