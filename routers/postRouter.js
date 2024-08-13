const express = require('express');

const postController = require('../controllers/postController');
const auth = require('../middlewares/auth');
const checkRole = require('../middlewares/checkRole');

const router = express.Router();

// AUTH
router.use(auth);

router.route('/paginated').get(postController.getPagniatedPosts);
router.route('/:id').get(postController.getPost);

router
  .route('/')
  .post(checkRole('user'), postController.createPost)
  .get(postController.getAllPosts);

router
  .route('/:name')
  .patch(postController.updatePost)
  .delete(postController.deletePost);

module.exports = router;
