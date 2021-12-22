const i18n = require('i18n');
require('dotenv').config();

i18n.configure({
  locales: ['en', 'vi'],
  fallbacks: { vi: 'en' },
  defaultLocale: process.env.DEFAULT_LANGUAGE || 8080,
  cookie: 'lang',
  directory: `${__dirname}/locales`,
  directoryPermissions: '755',
  autoReload: true,
  updateFiles: true,
  api: {
    __: '__', // now req.__ becomes req.__
    __n: '__n', // and req.__n can be called as req.__n
  },
});

module.exports = i18n;
