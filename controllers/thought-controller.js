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

    // get to get a single thought by _id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.status(400).json(err));

    },

    // post to create a new thought( don't forget to push the created thought's to the associated user's thoughts array field) userId and username
    createThought({ body }, res) {

        Thought.create(body)
            .then(dbThoughtData => {
                return User.findOneAndUpdate(
                    // pass username thought text
                    //! DON'T FORGET TO PROVIDE userID in insomnia
                    { _id: body.userId },
                    { $push: { thoughts: dbThoughtData._id } },
                    { new: true })
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this username' })
                }
                res.json(dbUserData)
            })
            .catch(err => res.status(400).json(err));

    },

    // put to update a thought by it's _id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought with this id!" })
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete to remove a thought by it's _id
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought with this id!" })
                    return;
                }
                // we should delete it from the user thoughts array
                return User.findOneAndUpdate(
                    { thoughts: params._id },
                    { $pull: { thoughts: params._id } },
                    { new: true }
                )
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "Thought deleted but no user with this id!" })
                    return;
                }
                res.json({ message: "Thought successfully deleted!" })
            })
            .catch(err => res.status(400).json(err));
    },
}







//! /api/thoughts/:thoughtId/reactions

// post to create a reaction stored in a single thought's reaction array field

// delete to pull and remove a reaction by the reaction's reactionId value

module.exports = thoughtController;
