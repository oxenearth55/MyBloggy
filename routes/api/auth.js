const express = require('express'); 
const router = express.Router(); 
const auth = require('../../middleware/auth');
const User = require('../../models/User'); 
const bcrypt = require('bcryptjs'); 
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken'); 
const config = require('config');


//SECTION Grab current user information such as name, email except password
//NOTE Read
router.get('/', auth, async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        res.status(500).send('Server get current user Error');
    }
    
});

//SECTION Register 
router.post('/',[
    check('email','Please include a valid email').isEmail(), 
    check('password', 'Password is required').exists()
], async (req, res) => {

  //SECTION Get input (email and password)
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()});
        }
        //NOTE Grab these properties from request
        const {email, password} = req.body;
    try{
        //NOTE Check user by using email
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({errors:[{msg:'Invalid email'}]});
        }
        //NOTE Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({errors:[{msg:'Invalid password'}]});
        }
    
        //SECTION Json webtoken
        const payload = {
            user:{
                id: user.id
            }
        }
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {expiresIn: 36000},
            // Callback 
            (err,token) => {
                if(err) throw err; 
                res.json({ token })
            }
        );
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server from log in Error');
    }
});

module.exports = router;
