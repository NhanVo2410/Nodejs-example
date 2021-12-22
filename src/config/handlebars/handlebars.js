const express = require('express');
// const path = require('path');
const handlebars = require('express-handlebars');
// import resource string
const i18n = require('../i18n/i18n');

module.exports = (app) => {
  app.use(express.static('./src/public'));

  app.engine('hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'main',
    helpers: {
      __(...args) { return i18n.__.apply(this, args); },
      __n(...args) { return i18n.__n.apply(this, args); },
    },
  }));
  app.set('view engine', 'hbs');
  app.set('views', './src/app/views');
  app.use(i18n.init);
};
