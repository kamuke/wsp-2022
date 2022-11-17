'use strict';
const express = require('express');
const {body} = require('express-validator');
const multer = require('multer');
const {cat_list_get, cat_get, cat_post, cat_put, cat_delete} = require('../controllers/catController');
const router = express.Router();

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || 
        file.mimetype === 'image/png' || 
        file.mimetype === 'image/gif') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const testFile = (req, res, next) => {
    if (req.file) {
        next();
    } else {
        res.status(400).json({errors: 'File is not image'});
    }
};

const upload = multer({ dest: './uploads/', fileFilter });

router.route('/').
    get(cat_list_get).
    post(upload.single('cat'),
        testFile,
        body('name').isLength({min: 1}).escape(),
        body('birthdate').isDate(),
        body('weight').isNumeric(),
        cat_post);

router.route('/:id').
    get(cat_get).
    delete(cat_delete).
    put(body('name').isLength({min: 1}).escape(),
        body('birthdate').isDate(),
        body('weight').isNumeric(),
        cat_put);

module.exports = router;