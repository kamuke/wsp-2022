// catController
'use strict';
const {getAllCats, getCat, addCat, updateCat, deleteCat} = require('../models/catModel');
const {httpError} = require('../utils/errors');

const cat_list_get = async (req, res, next) => {
  try {
    const cats = await getAllCats(next);
    if (cats.length < 1) {
      next(httpError('No cats found', 404));
      return;
    }
    res.json(cats);
  } catch (e) {
    console.error('cat_list_get', e.message);
    next(httpError('Internal server error', 500));
  }
};

const cat_get = async (req, res, next) => {
  try {
    const cat = await getCat(req.params.id, next);
    if (cat.length < 1) {
      next(httpError('No cat found', 404));
      return;
    }
    res.json(cat.pop());
  } catch (e) {
    console.error('cat_get', e.message);
    next(httpError('Internal server error', 500));
  }
};

const cat_post = async (req, res, next) => {
  try {
    // console.log('cat_post', req.body, 'cat_post', req.file);
    const data = [
      req.body.name,
      req.body.birthdate,
      req.body.weight,
      req.body.owner,
      req.file.filename,
    ];

    const result = await addCat(data, next);

    if (result.affectedRows < 1) {
      next(httpError('Invalid data', 400));
      return;
    }

    res.json({
      message: 'Cat added',
      cat_id: result.insertId,
    });
  } catch (e) {
    console.error('cat_post', e.message);
    next(httpError('Internal server error', 500));
  }
};

const cat_put = async (req, res, next) => {
  try {
    //console.log('cat_put', req.body);
    const data = [
      req.body.name,
      req.body.birthdate,
      req.body.weight,
      req.body.owner,
      req.body.id,
    ];

    const result = await updateCat(data, next);

    if (result.affectedRows < 1) {
      next(httpError('No cat modified', 400));
      return;
    }

    res.json({message: 'Cat modified',});
  } catch (e) {
    console.error('cat_put', e.message);
    next(httpError('Internal server error', 500));
  }
};

const cat_delete = async (req, res, next) => {
  try {
    //console.log('cat_delete', req.params.id);
    const cat = await deleteCat(req.params.id, next);

    if (cat.affectedRows < 1) {
      next(httpError('No cat deleted', 400));
      return;
    }

    res.json({message: 'Cat deleted',});
  } catch (e) {
    console.error('cat_delete', e.message);
    next(httpError('Internal server error', 500));
  }
};

module.exports = {
  cat_list_get,
  cat_get,
  cat_post,
  cat_put,
  cat_delete,
};