const express = require('express'); 
const router = express.Router();
const Blog = require('../../models/Blog'); 
const User = require('../../models/User');
const auth = require('../../middleware/auth'); 
const upload = require('../../middleware/multer');
const {check, validationResult} = require('express-validator');
const { json } = require('body-parser');
const imgbbUploader = require('imgbb-uploader');
const {cloudinary} = require('../../utils/cloudinary');
const fs = require('fs');

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
    const { topic, type, content, section } = req.body;
    try{
        const newBlog = new Blog({
            topic: topic,
            type: type,
            content: content,
            section: section,
            user: req.user.id
        })
        //NOTE Upload image to imgbb
        imgbbUploader("0a2fa7317578f0933d219e6afa5afc30", "/Users/macintoshhd/Desktop/Picture.jpg")
        .then(response => console.log(response))
        .catch(error => console.error(1))

        const PostBlog = await newBlog.save();
        res.json(PostBlog);
    }catch(err){
        return res.status(500).send('Server Create blog Error');
    }
});

//SECTION Get all blogs
router.get('/', async (req,res) => {
    try{
        const blogs = await Blog.find().sort({date:-1}).populate('user','firstName').populate('comments.user','firstName');
        res.json(blogs);
    }catch(err){
        res.status(500).send('Server get all blogs Error');
    }
});

//SECTION Get a blog by id
router.get('/:id', async (req, res) => {
    try{
        const blog = await Blog.findById(req.params.id).populate('user','name').populate('comments.user', 'name');
        res.json(blog);
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

//SECTION like blog 
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

//SECTION unlike blog 
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

        //NOTE index that the user want to delete 
        const indexOfComment = blog.comments.map(comment => comment._id.toString()).indexOf(req.params.commentId);
        if(indexOfComment == -1){
            return res.status(400).json({msg:'Comment does not exist'})
        }
        //NOTE test type
        console.log(indexOfComment) // print index
        // console.log(blog.comments[1].user); // print object of user
        // console.log(blog.comments[0].user._id.toString()); //print id of user as string

        //NOTE Check the user have the same id as the comment ? 
        if(blog.comments[indexOfComment].user.toString() !== req.user.id ){
            res.status(401).json({ msg: 'Unauthorized to delete the comment'});
        }

        blog.comments.splice(indexOfComment,1); 
        blog.save(); 

        res.json(blog.comments);

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server delete the comment Error');
    }

});

//SECTION Like comment 
router.put('/comment/like/:blogId/:commentId', auth, async (req,res) => {
    try{
        const blog = await Blog.findById(req.params.blogId);
        //NOTE find comment that a user going to like by id  
        const comment = blog.comments.find(comment => comment._id.toString() === req.params.commentId);

        if(!comment){
            res.status(400).json({msg:'Comment does not exist'});
        }

        if(comment.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
           return res.status(400).json({msg:'You already liked this blog '});          
        }

        comment.likes.unshift({user: req.user.id});
        blog.save();
        json(blog.comments);


    }catch(err){
        console.error(err.message);
        res.status(500).send('Server like comment Error');
    }

});

//SECTION Unlike comment
router.put('/comment/unlike/:blogId/:commentId', auth, async (req,res) => {
    try{
        //NOTE Access blog in Database 
        const blog = await Blog.findById(req.params.blogId); 
        //NOTE Get comment that a user select
        const comment = blog.comments.find(comment => comment._id.toString() === req.params.commentId);
        if(!comment){
            return res.status(400).json({msg:'Comment does not exist'});
        }
        if(comment.likes.filter(like => like.user.toString() === req.user.id).length <= 0 ){
            return res.status(400).json({mag:'You have not liked this blog'});
        }

        const indexOfUnlike = comment.likes.map(like => like.user.toString()).indexOf(req.user.id);
        comment.likes.splice(indexOfUnlike, 1); 
        blog.save();
        res.json(blog.comments);


    }catch(err){
        console.error(err.message);
        res.status(500).send('Sever unlike comment Error');
    }
})


//NOTE Upload image to cloudinary 
router.post('/upload', async (req ,res) => {
    try {
        const fileStr = req.body.data; 
        const uploadedResponse = await cloudinary.uploader.
        upload(fileStr, {
            upload_preset: 'ml_default'
        })
        console.log(uploadedResponse);
        res.json({msg: 'YAAAAA'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Server Upload Error');
        
    }    
});
router.get('/image', async (req,res) => {
    const { resources }  = await cloudinary.search
    .expression('public_id: nhotmpbfozf1njml4s8n')
    // .sort_by('public_id', 'desc')
    // .max_results(10)
    .execute()

    console.log('result is' + resources);
    res.send(resources)
})


router.post('/multer',auth ,upload.array('image'), async (req, res) => { //NOTE image is the field name

    try {
        const urls = []
        const files = req.files; //This is an array of image files
        console.log('Upload cloudinary running '+ files)
        // const uploader = async (path) => await uploads(path, 'Image');

        // const newPath = await uploader(files.path)

       
        for (const file of files) {
            // console.log('loop work '+ file);
          const  {path}  = file;
        //   const test = await uploader(path);



       const uploaders = async (path) => await cloudinary.uploader.upload(path,(result) => {
            return new Promise(resolve => {

            resolve({ //NOTE return url and public_id after uploading 
                // url: result.url,
                // id: result.public_id
            })
        }, {
            resource_type: "auto",
            folder: 'Home/Images'
        })
    })

       const newPath = await uploaders(path)

          urls.push(newPath)
          fs.unlinkSync(path) //NOTE synchronously remove a file or symbolic link from the filesystem
        }
        res.json(urls);

        res.status(200).json({message: 'images uploaded successfully'})
        
    } catch (error) {
        console.error(error.message);
        res.status(405).json({
            err: `${req.method} method not allowed`
          })   
    }
 

});


//NOTE Get Image from cloudinary
module.exports = router;