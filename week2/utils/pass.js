'use strict';
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const {getUserLogin} = require('../models/userModel');
const passportJWT = require('passport-jwt');
const bcrypt = require('bcryptjs');
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// local strategy for username password login
passport.use(new Strategy(
    async (username, password, done) => {
      const data = [username];
      
      try {
        const [user] = await getUserLogin(data);
        console.log('Local strategy', user); // result is binary row
        if (user === undefined) {
          return done(null, false, {message: 'Incorrect email.'});
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, {message: 'Incorrect password.'});
        }
        delete user.password;
        return done(null, {...user}, {message: 'Logged In Successfully'}); // use spread syntax to create shallow copy to get rid of binary row type
      } catch (err) {
        return done(err);
      }
    }));

passport.use(new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'asdfghjkl'
  }, (jwtPayload, done) => {
    console.log('JWTStrategy: ', jwtPayload);
    done(null, jwtPayload);
  }));

module.exports = passport;