const mongoose = require('mongoose');


const ART_TYPES=[

    "Digital Art",
    "Painting",
    "Drawing",
    "Illustration",
    "Photography",
    "Sculpture",
    "Mixed Media"
];

const artworkSchema = mongoose.Schema({

    title: {
        type:String,
        required: true,
    },

    imageUrl: {
        type:String,
        required: true,

    },

    artType: {
        type:String,
        required: true,
        enum:ART_TYPES
    },

    
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    
    likes: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

    comments: [{
        owner:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        description:{
            type: String,
            required: true,
        },

        createdAt: {
            type: Date,
            default: Date.now,
        },
    }],
    
    description: String,

    createdAt: {
            type: Date,
            default: Date.now,
    },

});

const Artwork = mongoose.model('Artwork', artworkSchema);

module.exports = {Artwork, ART_TYPES};