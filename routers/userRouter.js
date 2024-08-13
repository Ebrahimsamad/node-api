const express = require('express');

// const { signupSchema, loginSchema } = require('../validation/userSchema');
const { signup, login, createAdmin } = require('../controllers/userController');
const auth = require('../middlewares/auth');
const checkRole = require('../middlewares/checkRole');

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.post('/admin', auth, checkRole('admin'), createAdmin);

module.exports = router;
