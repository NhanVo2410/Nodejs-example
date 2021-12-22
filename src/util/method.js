// const jwt = require('jsonwebtoken');

// exports.retrieveToken = (headers) => {
//   if (headers && headers.authorization) {
//     const tokens = headers.authorization.split(' ');
//     if (tokens && tokens.length === 2) {
//       return tokens[1];
//     }
//     return null;
//   }
//   return null;
// };
// exports.isValidToken = (token) => {
//   try {
//     jwt.verify(token, process.env.JWT_SECRET_OR_KEY);
//     return true;
//   } catch (error) {
//     // error
//     return false;
//   }
// };
