const jwt = require('jsonwebtoken');
const UnautorizedError = require('../errors/UnautorizedError');

module.exports = (req, res, next) => {
  const { autorization } = req.headers;
  if (!autorization || !autorization.startsWith('Bearer ')) {
    throw new UnautorizedError('Необходима авторизация');
  }
  const token = autorization.replace('Bearer', '');
  let payload;
  try {
    payload = jwt.verify(token, 'secret-token');
  } catch (err) {
    throw new UnautorizedError('Необходима авторизация');
  }
  req.user = payload;
  next();
};
