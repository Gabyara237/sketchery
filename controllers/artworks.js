const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const {Artwork, ART_TYPES} = require('../models/artwork.js')


function timeAgo(date) {
  const seconds = Math.floor((Date.now() - new Date(date)) / 1000);

  const intervals = {
    y: 31536000, // year
    m: 2592000, // month
    d: 86400, // day
    h: 3600, // hour
    m: 60 // minute
  };

  for (const unit in intervals) {
    const value = Math.floor(seconds / intervals[unit]);
    if (value >= 1) {
      return `${value} ${unit}${value > 1 ? 's' : ''} ago`;
    }
  }

  return 'Right now';
}


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

router.get('/explore', async (req,res)=>{
    const allUserArtwork = await Artwork.find().populate('owner');
    res.locals.artworks = allUserArtwork;
    res.render("artworks/explore.ejs", {ART_TYPES, search:false});
    
})

router.get('/search', async (req,res) =>{
    try{
        let types= req.query.type;
        types = Array.isArray(types)? types : [types]
        let filter;
        if(types){
            filter = {artType: {$in: types}}
        }else{
            filter={}
        }
        const artworks = await Artwork.find(filter);
        res.locals.artworks = artworks;
        res.render('artworks/explore.ejs', {ART_TYPES, types, search: true});

    }catch (error){
        console.log(error);
        res.redirect('/');
    }
})

router.get('/:artworkId', async (req,res) => {
    try{
        const artwork = await Artwork.findById(req.params.artworkId).populate('comments.owner');
        
        res.locals.artwork = artwork;
        const editComment = req.query.editComment || null;

        const userHasLiked = artwork.likes.some((userId) => userId.toString() === req.session.user._id.toString());

        return res.render('artworks/show.ejs', {timeAgo, editComment, userHasLiked});

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

router.delete('/:artworkId/comment/:commentId', async (req, res)=>{
    try{
        const artwork = await Artwork.findById(req.params.artworkId).populate('comments.owner');
        const comment = artwork.comments.id(req.params.commentId);
        if( comment.owner.equals(req.session.user._id)){
            comment.deleteOne();
            await artwork.save();
            return res.redirect(`/artworks/${req.params.artworkId}`)
    
        }else{
            return res.redirect('/')
        }
        
    }catch (error){
        console.log(error)
        res.redirect('/')
    }

})

router.put('/:artworkId/comment/:commentId', async (req, res) =>{
    try{
        const artwork = await Artwork.findById(req.params.artworkId);
        const comment = artwork.comments.id(req.params.commentId); 
        
        if(comment.owner.equals(req.session.user._id)){
            
            comment.description = req.body.comment;
            await artwork.save();
            return res.redirect(`/artworks/${artwork._id}`)
        }else{
            return res.redirect('/')
        }

    }catch (error){
        console.log(error);
        res.redirect('/')

    }

})

router.post('/:artworkId/like', async (req,res)=>{
    try{
        await Artwork.findByIdAndUpdate(req.params.artworkId, {$addToSet:{likes:req.session.user._id}});
        const redirect = req.query.redirect;
        if(redirect === "show"){
            return res.redirect(`/artworks/${req.params.artworkId}`);    
        }else if(redirect === "explore"){
            return res.redirect(`/artworks/explore`);
        }else if(redirect === "artworks"){
            return res.redirect(`/artworks`);
        }
        res.redirect(`/artworks/${req.params.artworkId}`);
    }catch(error){
        console.log(error);
        res.redirect('/')
    }
})

router.delete('/:artworkId/like',async (req,res)=>{
    try{
        await Artwork.findByIdAndUpdate(req.params.artworkId, {$pull: {likes: req.session.user._id}});

        const redirect = req.query.redirect;
        if(redirect === "show"){
           return res.redirect(`/artworks/${req.params.artworkId}`);    
        }else if(redirect === "explore"){
            return res.redirect(`/artworks/explore`);
        }else if(redirect === "artworks"){
            return res.redirect(`/artworks`);
        }

        res.redirect(`/artworks/${req.params.artworkId}`);
    }catch (error){
        console.log(error);
        res.redirect('/')
    }
})



module.exports = router;