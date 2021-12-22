const chalk = require('chalk');
const debug = require('debug')('web');
const morgan = require('morgan');
const logger = require('./logger.config');

const port = process.env.SERVER_APP_PORT;
// import & configure logger
const { log } = console;

module.exports = (app) => {
  // log all request on console log
  app.use(morgan('combined'));
  logger.stream = {
    write(message, encoding) {
      logger.info(message, encoding);
    },
  };

  app.listen(port, () => {
    debug(`listening on port ${chalk.green(port)}`);
    logger.info(`Our server is running on port:${port}`);
    console.log(chalk.bgBlack(chalk.magenta(`Our server is running on port: ${port}`)));
    log(chalk.blue('Hello world!'));
  });
};
