const {
  createLogger,
  transports,
  format,
} = require('winston');

const path = require('path');
const fs = require('fs');
// log info on mongodb
require('winston-mongodb');

// create log file if not exist
const logDirectory = path.join(__dirname, process.env.LOG_DIR_NAME);
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}
const logger = createLogger({
  transports: [
    new transports.File({
      filename: process.env.LOG_FILE_NAME_INFO,
      level: 'info',
      dirname: logDirectory,
      handleExceptions: true,
      json: true,
      maxsize: process.env.LOG_MAX_SIZE,
      maxFiles: process.env.LOG_MAX_FILE,
      colorize: true,
      format: format.combine(format.timestamp(), format.simple()),
    }),
    new transports.File({
      filename: process.env.LOG_FILE_NAME_ERROR,
      level: 'error',
      dirname: logDirectory,
      handleExceptions: true,
      json: true,
      // zippedArchive: true,
      maxsize: process.env.LOG_MAX_SIZE,
      maxFiles: process.env.LOG_MAX_FILE,
      colorize: true,
      format: format.combine(format.timestamp(), format.simple()),
    }),
    // new transports.Console({
    //   name: 'error',
    //   level: 'error',
    //   handleExceptions: true,
    //   json: false,
    //   colorize: true,
    // }),
    new transports.Console({
      name: 'debug',
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    }),
    new transports.MongoDB({
      level: 'info',
      db: process.env.url1,
      options: { useUnifiedTopology: true },
      // maxsize: 1000,
      // maxFiles: process.env.LOG_MAX_FILE,
      collection: 'log.info',
      format: format.combine(format.timestamp(), format.simple()),
    }),
    new transports.MongoDB({
      level: 'error',
      db: process.env.url1,
      options: { useUnifiedTopology: true },
      collection: 'log.error',
      format: format.combine(format.timestamp(), format.simple()),
      formatter: (options) => `[${options.timestamp()}]: ${options.message || ''}`,
    }),
  ],
});

module.exports = logger;
