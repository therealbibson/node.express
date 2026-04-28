const { createUser, updateUser, getUser, getExistingUser, deleteUser } = require('../controllers/user.controller');
const userRouter = require('express').Router();

userRouter.get('/users', (req, res) => {
  res.send("display users");
});



module.exports = { userRouter }