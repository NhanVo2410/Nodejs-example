const ApiRouteUser = require('./user.route');
const ApiRouteTicket = require('./ticket.route');
const ApiRouteTicketDetail = require('./ticketdetail.route');
const ApiRouteProduct = require('./product.route');
const ApiRouteOrder = require('./order.route');
const ApiRouteAggregate = require('./testaggregate.route');
const auth = require('../../config/passport/passport')();

// auth.authenticate(),
function route(app) {
  app.use('/api/user', auth.authenticate(), ApiRouteUser);
  app.use('/api/ticket', auth.authenticate(), ApiRouteTicket);
  app.use('/api/ticket-detail', auth.authenticate(), ApiRouteTicketDetail);
  app.use('/odata/tblhelpdesk_users', auth.authenticate(), (req, res, next) => {
    console.log('test odata');
    next();
  });
  app.use('/api/product', ApiRouteProduct);
  app.use('/api/order', ApiRouteOrder);
  app.use('/api/test-aggregate', auth.authenticate(), ApiRouteAggregate);
}

module.exports = route;
