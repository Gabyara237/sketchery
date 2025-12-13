const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const {Artwork, ART_TYPES} = require('../models/artwork.js')

router.get('/', (req,res)=>{
    res.render('./artworks/index.ejs');
})

router.get('/new', (req,res)=>{
    res.render('artworks/new.ejs',{ART_TYPES});
})

router.post('/', async (req,res) =>{
    try{
        const newArtwork = new Artwork(req.body);
        newArtwork.owner = req.session.user._id;

       await newArtwork.save();
       res.redirect('/artworks');

    }catch (error){
        console.log(error);
        res.redirect('/');
    }
})

module.exports = router;