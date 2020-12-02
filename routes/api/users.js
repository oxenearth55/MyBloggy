const express = require('express'); 
const router = express.Router();
const {check, validationResult} = require('express-validator'); 
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

//ANCHOR @route: POST api/users
//ANCHOR @Description: Register users
//ANCHOR Public
router.post('/',[ //NOTE middleware
    //NOTE paremeter meaning = ('property name', 'message')
    check('name', 'Name is required')
    .not()
    .isEmpty(), 
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({
        min:6
    })
],async (req,res) => {
    const errors = validationResult(req); //if there are errors, it will return these in form of array
    //NOTE if there is error in check method above then, return 400 status and error message 
    if(!errors.isEmpty()){// not empty (!errors) means string not equal to zero 
        //NOTE 400 means error happened, 200 = not thing wrong
        return res.status(400).json({ errors: errors.array()}); //NOTE array() use to send error message from check() to res
    }
    console.log(req.body); //NOTE see what we are goning to post to the api so to use this, we have to have init middleware (bodyparser) in server.js

    const {name, email, password} = req.body;

    try{
    //ANCHOR See if user exists 
    //NOTE check this email is already use by another users?
    let user = await User.findOne({email}); // NOTE findOne is used to find and return specific value from database
    if(user){
       return res.status(400).json({errors: [{msg:'User already exists'}]});
    }
    
    //NOTE user maintain these properties before saving in the database
    user = new User({
        name,
        email,
        password
    });

    //ANCHOR Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    // res.json(user);


    } catch(err){ //NOTE when something wrong on the server (try function above)
        console.error(err.message);
        res.status(500).send('Server from register error');

    }

   

});

module.exports = router;
