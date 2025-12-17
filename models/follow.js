const mongoose = require('mongoose');

const followSchema = mongoose.Schema({

    follower:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },

    following:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
    
})

const Follow = mongoose.model('Follow', followSchema);

module.exports = Follow;