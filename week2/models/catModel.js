// ./models/catModel.js
'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllCats = async () => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wsp_user table).
    const [rows] = await promisePool.execute(`SELECT cat_id, wsp_cat.name, weight, owner, filename, birthdate, wsp_user.name AS ownername
                                              FROM wsp_cat INNER JOIN wsp_user 
                                              ON wsp_cat.owner = wsp_user.user_id`);
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const getCat = async (catId) => {
  try {
    const [rows] = await promisePool.execute(`SELECT cat_id, wsp_cat.name, weight, owner, filename, birthdate, wsp_user.name AS ownername
                                              FROM wsp_cat INNER JOIN wsp_user 
                                              ON wsp_cat.owner = wsp_user.user_id
                                              WHERE cat_id = ?;`, [catId]);
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
}

const addCat = async (data) => {
  try {
    const [rows] = await promisePool.execute(`INSERT INTO wsp_cat (name, birthdate, weight, owner, filename) 
                                              VALUES (?, ?, ?, ?, ?);`, data);
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
}

module.exports = {
  getAllCats,
  getCat,
  addCat,
};