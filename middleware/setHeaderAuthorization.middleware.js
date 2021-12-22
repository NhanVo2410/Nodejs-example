module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    req.headers.authorization = `Bearer ${req.cookies.Authorization}`;
    // const temp = `Bearer ${req.cookies.Authorization}`;
    // if (temp === undefined) {
    //   res.redirect('index');
    // }
  }
  next();
};
