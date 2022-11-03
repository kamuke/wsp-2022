// catController
'use strict';
const {getAllCats, getCat, addCat} = require('../models/catModel');

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
  console.log('addCat result', result);
  res.send('Cat post done.');
};

module.exports = {
  cat_list_get,
  cat_get,
  cat_post,
};