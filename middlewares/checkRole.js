module.exports = (role) => async (req, res, next) => {
  if (req.user.role === role) return next();
  res.status(403).send({ message: 'Not authorized' });
};
