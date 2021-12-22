const jwt = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const User = require('../models/user.model');

const pathToKey = path.join(__dirname, '..', '../config/key/id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

module.exports = function _(passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
  // Passport register
  passport.use('local.register', new LocalStrategy({
    usernameField: 'email',
    passswordField: 'password',
    passReqToCallback: true,
  },
  async (req, email, Password, done) => {
    await User.findOne({ 'local.email': email }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (user) {
        console.log('email đã tồn tại');
        return done(null, false, req.flash('signupMessage', 'email ready exist'));
      }
      const newUser = new User();
      newUser.info.FullName = req.body.FullName;
      newUser.info.UserName = req.body.UserName;
      newUser.local.email = email;
      newUser.local.Password = Password;
      newUser.local.Password = bcrypt.hashSync(newUser.local.Password, 10);
      newUser.save(() => {
        if (err) {
          return done(err);
        }
        return done(null, newUser);
      });
      return {};
    });
  }));
  /* Passport login */
  passport.use('local.login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },
  async (req, email, Password, done) => {
    await User.findOne({ 'local.email': email }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, req.flash('loginMessage', 'No user found.'));
      }
      if (user && !user.validPassword(Password)) {
        return done(null, false, req.flash('loginMessage', 'please, enter password again')); // thông báo lỗi chỉ này chỉ dùng khi dev
      // all is well, return successful user
      }
      // const payload = {
      //   id: user.id,
      //   // expire: Date.now() + 1000 * 60 * 60 * 24 * 7, //7 days
      //   // expire: Date.now() + 1000 * 60 * 2,
      //   maxAge: 30000,

      // };
      try {
        const token = jwt.sign({
          user,
          // email: user.local.email,
          // FullName: user.info.FullName,
          // _id: user._id,
        }, PRIV_KEY, {
          expiresIn: process.env.JWT_TOKEN_EXPIRATION,
          algorithm: process.env.JWT_TOKEN_HASH_ALGO,
        });
        console.log(`Access_token: ${token}`);
        // console.log(req.headers.cookie);
        return done(null, user, token);
      } catch (e) {
        throw Error(e);
      }
      // return res.json({
      //   sucess: true,
      //   message: 'Get token sucessfully',
      //   // eslint-disable-next-line no-underscore-dangle
      //   token: jwt.sign({ email: user.local.email, FullName: user.info.FullName, _id: user._id },
      //     process.env.ACCESS_TOKEN, { expiresIn: '1h' }),
      //   expiresIn: '1h',
      // });
      // res.json({
      //   sucess: true,
      //   message: 'Get token sucessfully',
      //   Access_token: token,
      //   expiresIn: '3p',
      // });
    });
  }));
};
