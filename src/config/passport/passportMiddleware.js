const express = require('express');
const passport = require('passport');

// init and configure passport
const app = express();
// middleware is call in each req
// check session & get passport.user. if it hasn't, it will create empty
app.use(passport.initialize());
// using session to get user info and attached req.user
app.use(passport.session());
require('../../app/controllers/auth.controller')(passport);

module.exports = app;
