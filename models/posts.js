const { Schema, model } = require('mongoose');

const postSchema = new Schema(
  {
    title: String,
    description: String,
    tags: [String],
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    images: [String],
  },
  {
    timestamps: true,
  },
);

module.exports = model('Post', postSchema);
