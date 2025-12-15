const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const {Artwork, ART_TYPES} = require('../models/artwork.js')

router.get('/', async (req,res)=>{
    try{
        const allArtworks = await Artwork.find({owner:req.session.user._id});
        res.locals.artworks = allArtworks;
        res.render('artworks/index.ejs');
    }catch (error){
        console.log(error);
        res.redirect('/')
    }
    
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

router.get('/:artworkId', async (req,res) => {
    try{
        const artwork = await Artwork.findById(req.params.artworkId);
        res.locals.artwork = artwork;
        res.render('artworks/show.ejs');
    }catch (error){
        console.log(error);
        res.redirect('/');
    }
    
})

module.exports = router;