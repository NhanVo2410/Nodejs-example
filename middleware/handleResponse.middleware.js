// const  = require('../src/util/handleResponse.json');

// exports.responseOk = (res, err, data = {}, message = '') => {
//   res.status(200).send({
//     errorCode: err,
//     message,
//     data,
//   });
// };
exports.responseOk = (res, status, message, data, result) => {
  res.status(status).send({
    status,
    message: message || message[status] || 'Error corrupt',
    data: result,
  });
};
exports.responseError = (res, status, message, err) => {
  res.status(status).send({
    status,
    message: message || message[status] || 'Error corrupt',
    error: err.message,
  });
};
