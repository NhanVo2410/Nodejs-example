const ODataServer = require('simple-odata-server');
const Adapter = require('simple-odata-server-mongodb');
const { MongoClient } = require('mongodb');
const auth = require('../../../middleware/auth.middleware')();

const model = require('../../app/models/edm.model');

const odataServer = ODataServer().model(model);

module.exports = (app) => {
  MongoClient.connect(process.env.url_Simple_Odata_Server, { useUnifiedTopology: true },
    (err, database) => {
      odataServer.adapter(Adapter((cb) => {
        cb(err, database.db('test'));
      }));
    });

  app.use('/odata', auth.authenticate(), (req, res) => {
    odataServer.handle(req, res);
  });
};
