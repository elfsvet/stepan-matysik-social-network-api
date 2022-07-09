const { Thought, User } = require('../models');
// need to finish it

//! /api/thoughts
const thoughtController = {
    // post to create a new thought( don't forget to push the created thought's to the associated user's thoughts array field) userId and username
    createThought({ body }, res) {
        Thought.create(body)
            .then(dbUserData => {
                return User.findOneAndUpdate(
                    // pass useid username thoughttext
                    { _id: body.userId },
                    { $push: { thoughts: dbUserData._id } },
                    { new: true })
            })
            .then(user => {
                if (!user) {
                    res.status(404).json({ message: 'No user' })
                }
                res.json(user)
            })
            .catch(err => res.status(400).json(err));

    },
}

// get to get all thoughts


// get to get a single thought by _id


// put to update a thought by it's _id

// delete to remove a thought by it's _id

//! /api/thoughts/:thoughtId/reactions

// post to create a reaction stored in a single thought's reaction array field

// delete to pull and remove a reaction by the reaction's reactionId value

module.exports = thoughtController;
