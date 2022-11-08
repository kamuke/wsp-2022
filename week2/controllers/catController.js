// catController
'use strict';
const {getAllCats, getCat, addCat, updateCat, deleteCat} = require('../models/catModel');
const { httpError } = require('../utils/errors');

const cat_list_get = async (req, res, next) => {
  res.json(await getAllCats(next));
};

const cat_get = async (req, res, next) => {
  const cat = await getCat(req.params.id, next);

  if (cat.length > 0) {
    res.json(cat.pop());
  } else {
    res.send('Virhe');
  }
};

const cat_post = async (req, res, next) => {
  // console.log('cat_post', req.body, 'cat_post', req.file);
  const data = [
    req.body.name,
    req.body.birthdate,
    req.body.weight,
    req.body.owner,
    req.file.filename,
  ];

  const result = await addCat(data, next);

  if (result.affectedRows > 0) {
    res.json({
      message: 'cat added',
      cat_id: result.insertId,
    });
  } else {
    res.send('Virhe');
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

    if (result.affectedRows > 0) {
      res.json({
        message: 'cat modified',
      });
    } else {
      res.send('Virhe');
    }
  } catch (e) {
    console.error('cat_put', e.message);
    next(httpError('Invalid input', 400));
  }
};

const cat_delete = async (req, res, next) => {
  //console.log('cat_delete', req.params.id);
  const cat = await deleteCat(req.params.id, next);

  if (cat.affectedRows > 0) {
    res.json({
      message: 'cat deleted',
    });
  } else {
    res.send('Virhe');
  }
};

module.exports = {
  cat_list_get,
  cat_get,
  cat_post,
  cat_put,
  cat_delete,
};