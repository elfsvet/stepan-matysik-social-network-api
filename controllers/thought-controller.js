const { Thought, User } = require('../models');
// need to finish it

//! /api/thoughts
const thoughtController = {
    
}

// get to get all thoughts


// get to get a single thought by _id

// post to create a new thought( don't forget to push the created thought's to the associated user's thoughts array field) userId and username

// put to update a thought by it's _id

// delete to remove a thought by it's _id

//! /api/thoughts/:thoughtId/reactions

// post to create a reaction stored in a single thought's reaction array field

// delete to pull and remove a reaction by the reaction's reactionId value

module.exports = thoughtController;
