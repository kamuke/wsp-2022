'use strict';

const {users, getUser} = require('../models/userModel');

const user_list_get = (req, res) => {
    res.json(users.filter(user => delete user.password));
};

const user_get = (req, res) => {
    const user = getUser(req.params.id);
    delete user.password;
    // console.log('user', user);
    res.json(user);
};

module.exports = {
    user_list_get,
    user_get,
};