const bcrypt = require('bcrypt');

const util = require('util');

const jwt = require('jsonwebtoken');

const jwtSign = util.promisify(jwt.sign);

const User = require('../models/users');

const Joi = require('joi');

const schema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().alphanum().min(6),
});

const logger = require('../util/logger');

exports.signup = async (req, res) => {
  try {
    await schema.validateAsync(req.body);

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).send('Email is already used.');

    const user = new User({ email, password });
    await user.save();
    logger.info(`User Created ${_id}`);
    res.send({ message: 'User created', user });
  } catch (error) {
    logger.error(`Faild To Register..  ${error}`);
    res.status(400).send({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.send('Invalid Email or Password');
    // VALID EMAIL
    const isMatched = await bcrypt.compare(password, user.password);
    if (isMatched) {
      // CORRECT EMAIL & PASSWORD
      const token = await jwtSign(
        { userId: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: '2d',
        },
      );
      logger.info(`user Logged In`);
      res.send({ message: 'user Logged In ', token });
    }
  } catch (error) {
    logger.error(`Invalid Email or Password..  ${error}`);
    res.status(400).send({ message: error.message });
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).send('Email is already used.');

    const user = new User({ email, password, role: 'admin' });
    await user.save();
    logger.info(`Admin Created`);
    res.send({ message: 'Admin created', user });
  } catch (error) {
    logger.error(`UnAuthorized..  ${error}`);
    res.status(400).send({ message: error.message });
  }
};
