const { route } = require("./users");
const router = require("express").Router();
const Post = require('../models/Post');

// create post
router.post('/', async (res, req) => {
    
    try{
        const newPost = new Post(req.body)
        const savedPost = await newPost.save()
        .then(result => console.log(result))
        // res.status(200).json(savedPost);
    } catch(err){
        // res.status(500).json(err)
        console.log(res)
    }
})
// update post
// delete post
// like a post
// get a post
// get timeline posts

module.exports = router;