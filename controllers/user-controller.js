const { User, Thought } = require('../models');
// need to finish it
//! /api/users

const userController = {

    // get all users
    getAllUser(req, res) {
        User.find()
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // get a single user by _id
    getUserById({ params }, res) {
        User.findOne(
            { _id: params.id }
        )
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // post a new user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    // put a new user / update a user by _id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // delete a user by _id and delete a thought associated with the user
    deleteUser({ params }, res) {
        User.findOneAndDelete(
            { _id: params.id }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                // work this out and see if you can display the data after the delete
                //! Application deletes a user's associated thoughts when the user is deleted.
                return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } })
            })
            .then(()=>{
                res.json({message: 'User deleted successfully!'});
            })
            .catch(err => res.status(400).json(err));
    },

    //! /api/users/:userId/friends/:friendId

    // post to add a new friend to a user's friend list
    createFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: params.friendId } },
            { runValidators: true, new: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete to remove a friend from a user's friend list
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { runValidators: true, new: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);

            })
            .catch(err => res.status(400).json(err));
    }
}


module.exports = userController;