const express = require('express');
const router = express.Router();

const Follow = require('../models/follow.js');

router.get('/', async (req,res)=> {
    try{
    
        const followers = await Follow.find({following: req.session.user._id}).populate('follower');
        const following = await Follow.find({follower:req.session.user._id}).populate('following')
        res.render('follows/index.ejs', { followers,following});
        
    }catch (error) {
        console.log(error);
        res.redirect('/');
    }


})


router.post('/:userId',async (req,res)=>{
    try{
        const followerId = req.session.user._id;
        const followingId= req.params.userId;

        if(followerId.toString() === followingId.toString()){
            return res.redirect(`/users/${followingId}`)
        }

        await Follow.create({
            follower: followerId,
            following: followingId,
        });

        res.redirect('/artworks/explore');

    }catch (error){
        console.log(error);
        res.redirect('/');
    }

})

router.delete('/:userId', async (req,res)=>{
    try{
        await Follow.findOneAndDelete({
            follower: req.session.user._id,
            following: req.params.userId,
        })

        res.redirect('/artworks/explore')
        
    }catch (error) {
        console.log(error);
        res.redirect('/')
    }
})

module.exports= router;