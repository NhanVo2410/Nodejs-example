const checklang = async (req, res, next) => {
  if (req.params.lang === 'vi') {
    const locale = 'vi';
    req.setLocale(locale);
    res.locals.language = locale;
  } else {
    const locale = 'en';
    req.setLocale(locale);
    res.locals.language = locale;
  }
  next();
};
module.exports = checklang;
