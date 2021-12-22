// express config
const express = require('express');
const methodOverride = require('method-override');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');

// import & configure db
const passportMiddleware = require('./config/passport/passportMiddleware');
require('./config/db/connection');

// import route db
const route = require('./app/routes');
const setHeaderAuthorization = require('../middleware/setHeaderAuthorization.middleware');

const app = express();
app.use(methodOverride('_method'));
app.use(cors());

// read cookie (cần cho xác thực)
// lấy thông tin từ html forms
app.use(cookieParser());
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requets of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// handlebars view engine configuration
require('./config/handlebars/handlebars')(app);
// odata configuration
require('./config/odata/odata')(app);
// logger configuration
require('./config/logger/logger')(app);

/* Cấu hình passport */
app.use(session({
  // chuoi ma hoa cookie
  secret: 'aabbcc',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 30000 },
}));

app.use(passportMiddleware);
// use connect-flash for flash messages stored in session
app.use(flash());

require('./app/routes/auth.route')(app, passport);

// set up route
app.use(setHeaderAuthorization);

route(app);
