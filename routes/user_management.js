const express = require('express');
const { getAllUsers, createUser, login, getUser, updateUserName, deleteUser, updatePassword } = require('../controller/user_controller');

const router = express.Router();

router.get('/users', getAllUsers);

router.post('/auth/register', createUser);

router.post('/auth/login', login);

router.delete('/auth/delete/:id', deleteUser);

router.get('/user_details/:id', getUser);

router.put('/user_details/:id', updateUserName);

router.put('/update_password/:id', updatePassword);

module.exports = router;