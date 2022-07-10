const { Thought, User } = require('../models');
// need to finish it

//! /api/thoughts
const thoughtController = {
    // get to get all thoughts
    getAllThought(req, res) {
        Thought.find()
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.status(400).json(err));

    },

    getThoughtById({params},res){
        Thought.findOne({_id: params.id})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.status(400).json(err));

    },

    // post to create a new thought( don't forget to push the created thought's to the associated user's thoughts array field) userId and username
    createThought({ body }, res) {
        Thought.create(body)
            .then(dbThoughtData => {
                return User.findOneAndUpdate(
                    // pass useid username thoughttext
                    //! DONT FORGET TO PROVIDE userID in insomnia
                    { _id: body.userId },
                    { $push: { thoughts: dbThoughtData._id } },
                    { new: true })
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user' })
                }
                res.json(dbUserData)
            })
            .catch(err => res.status(400).json(err));

    },
}



// get to get a single thought by _id


// put to update a thought by it's _id

// delete to remove a thought by it's _id

//! /api/thoughts/:thoughtId/reactions

// post to create a reaction stored in a single thought's reaction array field

// delete to pull and remove a reaction by the reaction's reactionId value

module.exports = thoughtController;
