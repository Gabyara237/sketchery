const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  profilePictureUrl:{
    type: String,
  },

  inspirations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artwork",
    }
  ]

});

const User = mongoose.model('User', userSchema);

module.exports = User;
