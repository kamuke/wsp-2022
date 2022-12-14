'use strict';
const pool = require('../database/db');
const {httpError} = require('../utils/errors');
const promisePool = pool.promise();

const getAllCats = async (next) => {
  try {
    const [rows] = await promisePool.execute(`SELECT cat_id, wsp_cat.name, weight, owner, filename, birthdate, wsp_user.name as ownername 
                                              FROM wsp_cat 
                                              JOIN wsp_user 
                                              ON wsp_user.user_id = wsp_cat.owner;`);
    return rows;
  } catch (e) {
    console.error('getAllCats', e.message);
    next(httpError('Database error', 500));
  }
};

const getCat = async (catId, next) => {
  try {
    const [rows] = await promisePool.execute(`SELECT cat_id, wsp_cat.name, weight, owner, filename, birthdate, coords, wsp_user.name as ownername 
                                              FROM wsp_cat 
                                              JOIN wsp_user 
                                              ON wsp_user.user_id = wsp_cat.owner 
                                              WHERE cat_id = ?;`, [catId]);
    return rows;
  } catch (e) {
    console.error('getCat', e.message);
    next(httpError('Database error', 500));
  }
};

const addCat = async (data, next) => {
  try {
    const [rows] = await promisePool.execute(`INSERT INTO wsp_cat (name, birthdate, weight, owner, filename, coords) VALUES (?, ?, ?, ?, ?, ?);`,
        data);
    return rows;
  } catch (e) {
    console.error('addCat', e.message);
    next(httpError('Database error', 500));
  }
};

const updateCat = async (data, user, next) => {
  try {
    if(user.role === 0){
      const [rows] = await promisePool.execute(`UPDATE wsp_cat SET name = ?, birthdate = ?, weight = ?, owner = ? WHERE cat_id = ?;`,
          data);
      return rows;
    } else {
      const [rows] = await promisePool.execute(`UPDATE wsp_cat SET name = ?, birthdate = ?, weight = ? WHERE cat_id = ? AND owner = ?;`,
          data);
      return rows;
    }

  } catch (e) {
    console.error('updateCat', e.message);
    next(httpError('Database error', 500));
  }
};

const deleteCat = async (catId, user, next) => {
  try {
    let sql = 'DELETE FROM wsp_cat where cat_id = ?';
    const params = [];
    if (user.role === 0) {
      params.push(catId);
    } else {
      sql += ' AND owner = ?;';
      params.push(catId, user.user_id);
    }
    const [rows] = await promisePool.execute(sql, params);
    return rows;
  } catch (e) {
    console.error('deleteCat', e.message);
    next(httpError('Database error', 500));
  }
};

module.exports = {
  getAllCats,
  getCat,
  addCat,
  updateCat,
  deleteCat,
};