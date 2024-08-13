const bcrypt = require('bcrypt');
const { model, Schema } = require('mongoose');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        return delete ret.password;
      },
    },
  },
);

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

const User = model('User', userSchema);

module.exports = User;
