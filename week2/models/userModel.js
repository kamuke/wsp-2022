'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllUsers = async () => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wsp_user table).
    const [rows] = await promisePool.execute(`SELECT user_id, name, email, role 
                                              FROM wsp_user`);
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const getUser = async (userID) => {
  try {
    const [rows] = await promisePool.execute(`SELECT user_id, name, email, role
                                              FROM wsp_user
                                              WHERE user_id = ?;`, [userID]);
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const addUser = async (data) => {
  try {
    const [rows] = await promisePool.execute(`INSERT INTO wsp_user (name, email, password) 
                                              VALUES (?, ?, ?);`, data);
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
}

module.exports = {
  getAllUsers,
  getUser,
  addUser,
};
