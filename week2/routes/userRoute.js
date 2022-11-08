'use strict';
const express = require('express');
const {user_list_get, user_get, user_post} = require('../controllers/userController');
const router = express.Router();

router.route('/').
    get(user_list_get).
    post(user_post).
    put((req, res) => {res.send('With this endpoint you can edit users.')}).
    delete((req, res) => {res.send('With this endpoint you can delete users.')});

router.route('/:id').get(user_get);

module.exports = router;