const express = require('express'); 
const router = express.Router();
const Blog = require('../../models/Blog'); 
const User = require('../../models/User');
const auth = require('../../middleware/auth'); 
const {check, validationResult} = require('express-validator');
const { json } = require('body-parser');

//ANCHOR blog
//SECTION Create blog 
router.post('/', [auth,
    check('topic', 'Topic is required').not().isEmpty(),
    check('type', 'Type is required').not().isEmpty(),
    check('content', 'Content is required').not().isEmpty()

], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const { topic, type, content } = req.body;
    try{
        const newBlog = new Blog({
            topic: topic,
            type: type,
            content: content,
            user: req.user.id
        })
        const PostBlog = await newBlog.save();
        res.json(PostBlog);
    }catch(err){
        return res.status(500).send('Server Create blog Error');
    }
});

//SECTION Get all blogs
router.get('/', async (req,res) => {
    try{
        const blogs = await Blog.find().sort({date:-1}).populate('user','name');
        res.json(blogs);
    }catch(err){
        res.status(500).send('Server get all blogs Error');
    }
});

//SECTION Get a blog by id
router.get('/:id', async (req, res) => {
    try{
        const blog = await Blog.findById(req.params.id).populate('user','name');;
        res.json(blog)
    }catch(err){
        if(err.kind == 'ObjectId'){ //NOTE if can not find blog id in database 
            return res.status(404).json({msg: 'Blog not found'});
        }
        res.status(500).send('Server get post Error');
    }

});

//SECTION Update blog 
router.put('/:id', [auth,
    check('topic', 'Topic is required').not().isEmpty(),
    check('type', 'Type is required').not().isEmpty(),
    check('content', 'Content is required').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const { topic, type, content } = req.body;

    try{
        const blog = await Blog.findById(req.params.id);
        if(!blog){
            res.status(404).json({msg:'Blog not found'});
        }
        //NOTE Check, Is this user his/her post
        if(blog.user.toString() === req.user.id){

            blog.topic =topic; 
            blog.type = type; 
            blog.content = content;
            await blog.save();
            res.json(blog);

    }else{
        res.status(401).json({msg: 'Unauthorized to edit this blog'})
    }

    }catch(err){
        if(err.kind == 'ObjectId'){
            return res.status(404).json({msg: 'Blog not found'})
        }
        res.status(500).send('Server update blog Error');
    }

});

//SECTION Delete blog 
router.delete('/:id', auth, async (req, res) => {
    try{
        const blog = await Blog.findById(req.params.id);
        if(!blog){
            res.status(404).json({msg:'Blog not found'});
        }
        // NOTE Delete Permission
        if(blog.user.toString() !== req.user.id){
           res.status(401).json({msg: 'Unauthorizedto delete this blog'})
        } 
      

       await blog.remove();
       res.json({msg:'Blog is removed'});

    }catch(err){
        if(err.kind== 'ObjectId'){
            return res.status(404).json({msg: 'Blog not found'});
        }
        res.status(500).send('Server delete blog Error');
    }

});

//SECTION like post 
router.put('/like/:id', auth, async (req,res ) => {
    try{
        const blog = await Blog.findById(req.params.id);
        //NOTE Check this user already like or not 
        if(blog.likes.filter(like => like.user.toString() === req.user.id).length>0){
           return res.status(400).json({msg: 'You already liked this blog '});
        }
        //Add user id at the top of the array 
        blog.likes.unshift({user: req.user.id});
        await blog.save();
        res.json(blog.likes);

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server like blog Error');
    }

});

//SECTION unlike post 
router.put('/unlike/:id', auth, async (req, res) => {
    try{
        const blog = await Blog.findById(req.params.id);
        if(blog.likes.filter(like => like.user.toString() === req.user.id).length == 0 ){
            return res.status(400).json({msg:'You have not liked this blog'});
        }
        const indexOfLike = blog.likes.map(like => like.user.toString()).indexOf(req.user.id); 
        blog.likes.splice(indexOfLike, 1 ); 
        await blog.save();
        res.json(blog.likes[indexOfLike]);

        //NOTE Test type 
        // console.log(typeof blog.likes[0]._id)
        // console.log(typeof blog.likes[0].id)
        // console.log( blog.likes[0]._id)
        // console.log( blog.likes[0].id)
        // console.log( blog.likes[0]._id.toString() === blog.likes[0].id )


    }catch(err){
        console.error(err.message);
        res.status(500).send('Server unlike Error');
    }

});


//ANCHOR comments
//SECTION Create Comment 
//NOTE create comment in specific blog
router.post('/comment/:blogId',[auth,
    check('text', 'Text is required ').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req); 
    if(!errors.isEmpty()){
        res.status(400).json({errors:errors.array()});
    }
    const {text} = req.body;
    try{
        const blog = await Blog.findById(req.params.blogId);

        const newComment = {
            text:text, 
            user:req.user.id
        }

        blog.comments.unshift(newComment);
        // console.log(blog.comments[1].user.name)
        blog.save();
        res.json(blog.comments);

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server create commment Error');
    } 
});

//SECTION Delete the comment 
router.delete('/comment/:blogId/:commentId', auth ,async (req, res) => {
    try{
        const blog = await Blog.findById(req.params.blogId);
        const indexOfComment = blog.comments.map(comment => comment.user.toString()).indexOf(req.params.commentId)
        console.log(indexOfComment);
        console.log(blog.comments[indexOfComment].user.toString());
        if(blog.comments[indexOfComment].user.toString() !== req.user.id ){
            res.status(401).json({ msg: 'Unauthorized to delete the comment'});
        }

        // res.json(blog);

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server delete the comment Error');
    }

});


module.exports = router;