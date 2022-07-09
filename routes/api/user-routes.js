const router = require('express').Router();

const {getAllUser, createUser, getUserById, updateUser, deleteUser, createFriend, deleteFriend} = require('../../controllers/user-controller')

router
.route('/')
.get(getAllUser)
.post(createUser)

router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

//! /api/users/:userId/friends/:friendId
router
.route('/:userId/friends/:friendId')
.post(createFriend)
.delete(deleteFriend);

module.exports = router;