const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const {Artwork, ART_TYPES} = require('../models/artwork.js')

router.get('/', async (req,res)=>{
    try{
        const allArtworks = await Artwork.find({owner:req.session.user._id});
        res.locals.artworks = allArtworks;
        res.locals.currentUser = req.session.user;
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
        res.locals.currentUser = req.session.user;
        res.render('artworks/show.ejs');
    }catch (error){
        console.log(error);
        res.redirect('/');
    }
    
})

router.delete('/:artworkId', async (req,res) =>{
    try{
        const artwork = await Artwork.findById(req.params.artworkId);
        if(artwork.owner.equals(req.session.user._id)){
            await Artwork.deleteOne({_id: artwork._id});
            return res.redirect('/artworks');
        }else{
            return res.redirect('/');
        }
        
    }catch (error){
        console.log(error);
        res.redirect('/')
    }
})


router.get('/:artworkId/edit', async (req, res) =>{
    try{
        const artwork = await Artwork.findById(req.params.artworkId);
        if(artwork.owner.equals(req.session.user._id)){
            
            return res.render('artworks/edit.ejs', {artwork, ART_TYPES});

        }else{
            return res.redirect('/')
        }
    }catch (error) {
        console.log(error)
        res.redirect('/')

    }
})

router.put('/:artworkId', async (req, res) => {
    try{
        const artwork = await Artwork.findById(req.params.artworkId);

        if(artwork.owner.equals(req.session.user._id)){
            artwork.set(req.body);
            await artwork.save();
            return res.redirect(`/artworks/${artwork._id}`);

        }else{
            return res.redirect('/');
        }
    }catch (error){
        console.log(error);
        res.redirect('/');
    }
})

router.post('/:artworkId/comment', async (req,res) =>{
    try{
        const artwork = await Artwork.findById(req.params.artworkId);
        const comment = {
            owner: req.session.user._id,
            description: req.body.comment,
        }

        artwork.comments.push(comment)
        await artwork.save();
        res.redirect(`/artworks/${artwork._id}`);

    }catch (error){ 
        console.log(error);
        res.redirect('/');
    }
})


module.exports = router;