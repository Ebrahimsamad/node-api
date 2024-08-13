const express = require('express');

const path = require('path');

require('express-async-errors');

const postRouter = require('./routers/postRouter');
const userRouter = require('./routers/userRouter');

const app = express();

app.use(express.json());
app.use(express.static('./public'));

app.use('/posts', postRouter);

app.use(userRouter);

app.get('/', (req, res) => {
  const absPath = path.join(__dirname, 'index.html');
  res.sendFile(absPath);
});

const multer = require('multer');

// const memoryStorage = multer.memoryStorage();
const upload = multer({
  dest: 'uploads',
  fileFilter: function (req, file, cb) {
    const extensions = ['image/jpg', 'image/jpeg', 'image/png'];
    if (extensions.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb("couldn't upload file", false);
    }
  },
});

app.post('/', upload.single('image'), (req, res) => {
  res.send('file uploaded');
});

app.use((err, req, res, next) => {
  // const { message, statusCode } = err;
  // res.status(statusCode).send(message);
  res.status(400).send(err);
});

module.exports = app;
