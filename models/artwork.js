const express = require("express");
const mongoose = require("mongoose");

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
    },

    
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    
    likes: [{
        typeof:mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

    comments: {
        owner:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        description:{
            type: String,
            required: true,
        },

        createdAt: Date,
    },
    
    description: String,

    createdAt: Date,

});

const Artwork = mongoose.model('Artwork', artworkSchema);

module.exports = Artwork;