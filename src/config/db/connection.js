const mongoose = require('mongoose');
const debug = require('debug')('web:connectdb');
const chalk = require('chalk');
const logger = require('../logger/logger.config');

const dbHost = process.env.MONGOOSE_DB_HOST;
const dbPort = process.env.MONGOOSE_DB_PORT;
const dbName = process.env.MONGOOSE_DB_NAME;
const dbName1 = process.env.MONGOOSE_DB_NAME1;
const username1 = process.env.MONGOOSE_DB_USERNAME1;
const password = process.env.MONGOOSE_DB_PASSWORD;
try {
  mongoose.set('useUnifiedTopology', true);
  if (process.env.NODE_ENV === 'development') {
    debug('Connect to dev database');
    mongoose.connect(process.env.url1, { useNewUrlParser: true, useCreateIndex: true });
    console.log(chalk.cyanBright('db1 dev'));
  } else if (process.env.NODE_ENV === 'production') {
    debug('Connect to prod database');
    mongoose.connect(`mongodb://${username1}:${password}@${dbHost}:${dbPort}/${dbName}`, { useNewUrlParser: true, useCreateIndex: true });
    console.log('db2 prod');
  } else {
    debug('Connect to test database');
    mongoose.connect(`mongodb://${username1}:${password}@${dbHost}:${dbPort}/${dbName1}`, { useNewUrlParser: true, useCreateIndex: true });
    console.log('db3 test');
  }
} catch (e) {
  logger.error(chalk.redBright('Error connect server', e));
}
