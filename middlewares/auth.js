const { promisify } = require('util');

const jwt = require('jsonwebtoken');

const User = require('../models/users');

const logger = require('../util/logger');

const jwtVerify = promisify(jwt.verify);

module.exports = async (req, res, next) => {
  try {
    const { authorization: token } = req.headers;
    const { userId } = await jwtVerify(token, process.env.JWT_SECRET);
    /////////////////////// MONGOOSE METHOD
    const user = await User.findById(userId);
    // if (!user) return res.status(401).send("unAuthorized");
    req.user = user;
    next();
  } catch (error) {
    logger.error(`UnAuthorized..  ${error}`);
    res.status(400).send({ message: error.message });
  }
};
