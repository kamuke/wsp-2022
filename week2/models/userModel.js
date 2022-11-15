'use strict';
const pool = require('../database/db');
const { httpError } = require('../utils/errors');
const promisePool = pool.promise();

const getAllUsers = async (next) => {
  try {
    const [rows] = await promisePool.execute(`SELECT user_id, name, email, role 
                                              FROM wsp_user`);
    return rows;
  } catch (e) {
    console.error('getAllUsers', e.message);
    next(httpError('Database error', 500));
  }
};

const getUser = async (userID, next) => {
  try {
    const [rows] = await promisePool.execute(`SELECT user_id, name, email, role
                                              FROM wsp_user
                                              WHERE user_id = ?;`, [userID]);
    return rows;
  } catch (e) {
    console.error('getUser', e.message);
    // next virheenhallinta ei taida toimia pass.js:n kanssa yhteen
    // next(httpError('Database error', 500));
  }
};

const addUser = async (data, next) => {
  try {
    const [rows] = await promisePool.execute(`INSERT INTO wsp_user (name, email, password) 
                                              VALUES (?, ?, ?);`, data);
    return rows;
  } catch (e) {
    console.error('addUser', e.message);
    next(httpError('Database error', 500));
  }
};

const getUserLogin = async (data, next) => {
  try {
    // console.log(data);
    const [rows] = await promisePool.execute('SELECT * FROM wsp_user WHERE email = ?;', data);
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
  getUserLogin,
};
