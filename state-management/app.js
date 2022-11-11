'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
const port = 3000;
const username = 'foo';
const password = 'bar';

app.set('views', './views');
app.set('view engine', 'pug');

app.use(cookieParser());
app.use(session({
  secret: 'Jabadabaduu!',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 60*60*24}
}));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/setCookie/:clr', (req, res) => {
  console.log(req.params.clr);
  res.cookie('color', req.params.clr, {httpOnly: true}).send('Cookie set');
});

app.get('/getCookie', (req, res) => {
  console.log('Cookies: ', req.cookies);
  res.send('Cookie read');
});

app.get('/deleteCookie', (req, res) => {
  res.clearCookie('color');
  res.send('Cookie deleted');
});

app.get('/form', (req, res) => {
  res.render('form');
});

app.get('/secret', (req, res) => {
  if (!req.session.logged) {
    res.redirect('/form');
    return;
  }
  res.render('secret');
});

app.post('/login', (req, res) => {
  const uname = req.body.username;
  const passwd = req.body.password;

  if (uname !== username || passwd !== password) {
    req.session.logged = false;
    res.redirect('/form');
    return;
  }
  req.session.logged = true;
  res.redirect('/secret');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
