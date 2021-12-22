// // const jwt = require('jsonwebtoken');
// // const isEmpty = require('lodash');
// // const AuthUtils = require('../src/utils/auth.util');
// const passport = require('passport');
// const passportJWT = require('passport-jwt');
// const path = require('path');
// const fs = require('fs');
// const User = require('../src/app/models/user.model');

// const pathToKey = path.join(__dirname, '..', 'src/config/key/id_rsa_pub.pem');
// const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

// const { ExtractJwt } = passportJWT;
// const { Strategy } = passportJWT;

// module.exports = () => {
//   const params = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: PUB_KEY,
//     algorithms: ['RS256'],
//   };
//   const strategy = new Strategy(params, ((payload, done) => {
//     User.findOne({ id: payload._id }, (err, user) => {
//       if (err) {
//         return done(new Error('User Not Found'), null);
//       } if (payload.expire <= Date.now()) {
//         return done(new Error('Token Expired'), null);
//       } if (user) {
//         return done(null, user);
//       }
//       return done(null, false);
//     });
//   }));
//   passport.use(strategy);
//   return {
//     initialize() {
//       return passport.initialize();
//     },
//     authenticate() {
//       return passport.authenticate(process.env.JWT_SCHEME, { session: false });
//       // async (req, res, user, next) => {
//       //   console.log(user);
//       //   // const body = req.body ? req.body.query : '';
//       //   const token = req.header('x-auth-token');
//       //   // const token = req.header('authorization');
//       //   console.log('Authorization token => ', token);
//       //   if (!token) {
//       //     res.status(403).json({ message: 'Forbidden' });
//       //   } else {
//       //     const verified = jwt.verify(token, process.env.JWT_SECRET_OR_KEY);
//       //     req.verified = verified;
//       //     next();
//       //   }
//       // });
//     },
//   };
// };
