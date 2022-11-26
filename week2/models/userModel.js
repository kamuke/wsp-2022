'use strict';
const pool = require('../database/db');
const {httpError} = require('../utils/errors');
const promisePool = pool.promise();

const getAllUsers = async (next) => {
  try {
    const [rows] = await promisePool.execute(`SELECT user_id, name, email, role FROM wsp_user;`);
    return rows;
  } catch (e) {
    console.error('getAllUsers', e.message);
    next(httpError('Database error', 500));
  }
};

const getUser = async (userId, next) => {
  try {
    const [rows] = await promisePool.execute(`SELECT user_id, name, email, role FROM wsp_user
                                              WHERE user_id = ?;`, [userId]);
    return rows;
  } catch (e) {
    console.error('getUser', e.message);
   // next(httpError('Database error', 500));
  }
};

const addUser = async (data, next) => {
  try {
    const [rows] = await promisePool.execute(`INSERT INTO wsp_user (name, email, password) VALUES (?, ?, ?);`,
        data);
    return rows;
  } catch (e) {
    console.error('addUser', e.message);
    next(httpError('Database error', 500));
  }
};

const updateUser = async (data, next) => {
  try {
    const [rows] = await promisePool.execute(`UPDATE wsp_user set name = ?, email = ?, password = ? WHERE user_id = ?;`,
        data);
    return rows;
  } catch (e) {
    console.error('updateUser', e.message);
    next(httpError('Database error', 500));
  }
};

const deleteUser = async (userId, next) => {
  try {
    const [rows] = await promisePool.execute(`DELETE FROM wsp_user where user_id = ?;`,
        [userId]);
    return rows;
  } catch (e) {
    console.error('deleteUser', e.message);
    next(httpError('Database error', 500));
  }
};

const getUserLogin = async (params, next) => {
  try {
    console.log(params);
    const [rows] = await promisePool.execute(
        'SELECT * FROM wsp_user WHERE email = ?;',
        params);
    return rows;
  } catch (e) {
    console.error('getUserLogin', e.message);
    next(httpError('Database error', 500));
  }
};

module.exports = {
  getAllUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  getUserLogin,
};