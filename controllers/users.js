const express = require('express');

const router = express.Router();
const User = require('../models/user.js');
const {Artwork} = require('../models/artwork.js');

router.get('/:userId',async(req,res)=>{
    const userProfile = await User.findById(req.params.userId);
    const allArtworks = await Artwork.find({owner:req.params.userId});
    res.render("users/show.ejs", {allArtworks, userProfile});
})


module.exports = router;
