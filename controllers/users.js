const express = require('express');

const router = express.Router();
const User = require('../models/user.js');
const {Artwork} = require('../models/artwork.js');
const Follow = require('../models/follow.js');

router.get('/:userId',async(req,res)=>{
    const userProfile = await User.findById(req.params.userId);
    const allArtworks = await Artwork.find({owner:req.params.userId});

    const followers = await Follow.find({following:req.session.user._id});
    const following = await Follow.find({follower:req.params.userId});

    res.render("users/show.ejs", {allArtworks, userProfile, followers, following});
})

router.post('/:artworkId', async (req,res)=>{

    try{
        await User.findByIdAndUpdate(req.session.user._id, {$addToSet:{inspirations: req.params.artworkId}})
        res.redirect('/artworks');
    }catch (error) {
        console.log(error);
        res.redirect('/')
    }

})

module.exports = router;
