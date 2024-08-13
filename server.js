const mongoose = require('mongoose');

const dotenv = require('dotenv');

const app = require('./app');

const User = require('./models/users');

dotenv.config({ path: './config.env' });

// CONNECT TO THE DATABASE
const { ADMIN, ADMIN_PASS, PORT } = process.env;
mongoose.connect(process.env.DB_URL).then(async () => {
  // CREATING ADMIN
  const existingAdmin = await User.findOne({ email: ADMIN });
  if (!existingAdmin) {
    const admin = new User({
      email: ADMIN,
      password: ADMIN_PASS,
      role: 'admin',
    });
    // HERE hook will run
    await admin.save();
  }
  app.listen(PORT, () => {
    console.log(`App is Running on port ${PORT}...`);
  });
});
