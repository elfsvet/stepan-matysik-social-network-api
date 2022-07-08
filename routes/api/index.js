const router = require('express').Router();
const thoughtRouter = require('./thought-routes');
const userRouter = require('./user-routes');

router.use('/thoughts', thoughtRouter);
router.use('/users', userRouter);

module.exports = router;