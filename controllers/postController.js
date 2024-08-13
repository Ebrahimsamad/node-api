const Post = require('../models/posts');
const logger = require('../util/logger');

exports.getPost = async (req, res) => {
  try {
    const postId = req.params.id;
    // const post = await Post.findById(postId);
    const post = await Post.findById(postId).populate('userId');
    if (!post) throw new Error('Post not found');
    if (post.userId.toString() !== String(req.user._id))
      throw new Error('unauthorized');
    res.send(post);
  } catch (error) {
    logger.error(`Faild To Fetch Post..  ${error}`);
    res.status(400).send({ message: error.message });
  }
};

exports.getPagniatedPosts = async (req, res, next) => {
  try {
    const limit = 10;
    // ?page=1&query=value
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * limit;
    const postCounts = await Post.countDocuments();
    const posts = await Post.find().skip(skip).limit(limit);
    const pagesNumber = Math.ceil(postCounts / limit);

    res.send({
      posts,
      pagination: {
        total: postCounts,
        pages: pagesNumber,
        page,
        prev: page > 1,
        next: page < pagesNumber,
      },
    });
  } catch (error) {
    logger.error(`Faild To Paginate..  ${error}`);
    res.status(400).send({ message: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.user._id });
    res.send(posts);
  } catch (error) {
    logger.error(`Faild To Fetch Posts..  ${error}`);
    res.status(400).send({ message: error.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { _id } = req.user;
    const { body } = req;
    const post = new Post({ ...body, userId: _id });
    await post.save();
    logger.info(`Post Created ${_id}`);
    res.send('Post created');
  } catch (error) {
    logger.error(`Faild To Create Post..  ${error}`);
    res.status(400).send({ message: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const oldPost = req.params.name;
    const postName = req.body.name;
    await Post.updateOne({ name: oldPost }, { name: postName });
    logger.info(`Post Updated`);
    res.send('Post Updated');
  } catch (error) {
    logger.error(`Faild To Update Post..  ${error}`);
    res.status(400).send({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  // NAME
  try {
    const namePost = req.params.name;
    await Post.deleteOne({ name: namePost, userId: req.user._id });
    logger.info(`Post Deleted`);
    res.send('Post Deleted');
  } catch (error) {
    logger.error(`Faild To Delete Post..  ${error}`);
    res.status(400).send({ message: error.message });
  }
};
