const express = require('express'); 
const router = express.Router();
const Blog = require('../../models/Blog'); 
const auth = require('../../middleware/auth'); 
const {check, validationResult} = require('express-validator');

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
        const user = await User.findById(req.user.id).select('-password'); 
        const newBlog = new Blog({
            topic: topic,
            type: type,
            content: content,
            user: user
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
        const blogs = await Blog.find().sort({date:-1});
        res.json(blogs);

    }catch(err){
        res.status(500).send('Server get all blogs Error');
    }
});

//SECTION Get a profile by id
router.get('/:id', async (req, res) => {
    try{
        const blog = await Blog.findById(req.params.id);
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
        res.status(401).json({msg: 'You dont have a permission to edit this blog'})
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
           res.status(401).json({msg: 'You dont have a permission to delete this blog'})
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

module.exports = router;