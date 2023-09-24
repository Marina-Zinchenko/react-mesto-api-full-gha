const rateLimit = require('express-rate-limit');

module.exports.limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

module.exports.urlRegExp = /^https?:\/\/(www\.)?[0-9a-zA-Z]+([.|-]{1}[0-9a-zA-Z]+)*\.[0-9a-zA-Z-]+(\/[0-9a-zA-Z\-._~:/?#[\]@!$&'()*+,;=]*#?)?$/;
