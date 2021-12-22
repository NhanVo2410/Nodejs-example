// const auth = require('../../../middleware/auth.middleware')();
const checklang = require('../../../middleware/language.middleware');

module.exports = (app, passport) => {
  app.get('/', (req, res) => {
    // res.render('pages/index.ejs'); // load the index.ejs file
    res.render('index'); // load the index.ejs file
  });

  app.get('/auth/signup', (req, res) => {
    res.render('signup', { message: req.flash('signupMessage') });
  });

  app.post('/auth/signup', passport.authenticate('local.register', {
    successRedirect: '/profile', // chuyển hướng tới trang được bảo vệ
    failureRedirect: '/auth/signup', // trở lại trang đăng ký nếu có lỗi
    failureFlash: true, // allow flash messages
  }));

  app.get('/createuser', (req, res) => {
    res.render('createUser', { message: req.flash('signupMessage') });
  });

  // eslint-disable-next-line linebreak-style
  app.post('/createuser', passport.authenticate('local.register', {
    successRedirect: '/api/user', // chuyển hướng tới trang được bảo vệ
    failureRedirect: '/createuser', // trở lại trang đăng ký nếu có lỗi
    failureFlash: true, // allow flash messages
  }));
  function isLoggedIn(req, res, next) {
    // Nếu một user đã xác thực, cho đi tiếp
    if (req.isAuthenticated()) return next();
    // Nếu chưa, đưa về trang chủ
    return res.redirect('/');
  }

  app.get('/auth/login', (req, res) => {
    // Hiển thị trang và truyển lại những tin nhắn từ phía server nếu có
    res.render('login', { message: req.flash('loginMessage') });
  });

  app.post('/auth/login', (req, res, next) => {
    passport.authenticate('local.login', (err, user, token) => {
      // const options = {
      //   url: '<your url>',
      //   method: 'POST',
      //   json: req.body,
      //   headers: {
      //     'User-Agent': 'my request',
      //     Authorization: 'Bearer <your token>',
      //     'Content-Type': 'application/json',
      //     Accept: 'application/json',
      //   },
      // };
      // const authTokens = {};
      // authTokens.token = user;
      // res.cookie('AuthToken', token);
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect('/auth/login');
      }
      return req.login(user, () => {
        try {
          console.log('redirecting....');
          // res.header('Authorization', `Bearer ${token}`);
          res.header('Authorization', `Bearer ${token}`);
          res.cookie('Authorization', token);
          res.cookie('UserName', user.local.UserName);
          res.cookie('user_id', user._id);
          console.log(user);
          // console.log(res);
          // console.log(res.cookie('Authorization'));
          // console.log(res.header.authorization);
          res.redirect('/profile');
        } catch {
          throw Error(err);
        }
      });
    })(req, res, next);
  });

  app.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile', {
      user: req.user.toObject(), // Lấy thông tin user trong session và truyền nó qua template
    });
  });

  app.get('/auth/logout', (req, res) => {
    res.clearCookie('Authorization');
    res.clearCookie('UserName');
    res.clearCookie('user_id');
    req.logout();
    res.redirect('/');
  });
  // app.get('/auth/logout', (req, res) => {
  //   const cookie = req.cookies;
  //   for (const prop in cookie) {
  //     if (cookie.prototype.hasOwnProperty.call(prop)) {
  //       res.cookie(prop, '', { expire: Date.now() + 1000 *  });
  //     }
  //   }
  //   res.redirect('/');
  // });
  app.get('/auth/language/:lang', checklang, (req, res) => {
    res.cookie('lang', req.params.lang, { maxAge: 900000, httpOnly: true });
    res.render('index');
  });
};
