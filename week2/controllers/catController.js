// catController
'use strict';
const {getAllCats, getCat} = require('../models/catModel');

const cat_list_get = async (req, res) => {
  res.json(await getAllCats());
};

const cat_get = (req, res) => {
    const cat = getCat(req.params.id);
    res.json(cat);
};

const cat_post = (req, res) => {
  console.log('cat_post', req.body, 'cat_post', req.file);
  res.send('Cat post done.');
};

module.exports = {
  cat_list_get,
  cat_get,
  cat_post,
};