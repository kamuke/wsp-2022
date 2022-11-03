// catController
'use strict';
const {getAllCats, getCat, addCat, updateCat, deleteCat} = require('../models/catModel');

const cat_list_get = async (req, res) => {
  res.json(await getAllCats());
};

const cat_get = async (req, res) => {
  const cat = await getCat(req.params.id);

  if (cat.length > 0) {
    res.json(cat.pop());
  } else {
    res.send('Virhe');
  }
};

const cat_post = async (req, res) => {
  // console.log('cat_post', req.body, 'cat_post', req.file);
  const data = [
    req.body.name,
    req.body.birthdate,
    req.body.weight,
    req.body.owner,
    req.file.filename,
  ];

  const result = await addCat(data);

  if (result.affectedRows > 0) {
    res.json({
      message: 'cat added',
      cat_id: result.insertId,
    });
  } else {
    res.send('Virhe');
  }
};

const cat_update = async (req, res) => {
  console.log('cat_update', req.body);
  const data = [
    req.body.name,
    req.body.birthdate,
    req.body.weight,
    req.body.owner,
    req.body.id,
  ];

  const result = await updateCat(data);

  if (result.affectedRows > 0) {
    res.json({
      message: 'cat modified',
    });
  } else {
    res.send('Virhe');
  }
};

const cat_delete = async (req, res) => {
  console.log('cat_delete', req.params.id);
  const cat = await deleteCat(req.params.id);

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
  cat_update,
  cat_delete,
};