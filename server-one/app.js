'use strict';

const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'pug');

// app.get('/', (req, res) => {
//     res.render('index', { title: 'Hey', message: 'Hello there!' })
// });

app.use(express.static('public'));

app.get('/catinfo', (req, res) => {
    const cat = {
        name: 'Frank',
        birthdate: '2010-12-25',
        weight: 8,
    };
    res.json(cat);
});

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});