const jwt = require('jsonwebtoken');
const config = require('config');

//NOTE get token from user then vertify and decoded it for authentication
module.exports = function(req, res, next){

    //ANCHOR Get token from the header of request 
    const token = req.header('x-auth-token');
    
    //ANCHOR check if not token 
    if(!token){
        return res.status(401).json({msg:'No token, authorization denined'}) //NOTE 401 means not authorized
    }
    //ANCHOR verfify token 
    try{
        const decoded = jwt.verify(token, config.get('jwtSecret')); //NOTE (header + payload) + (header + secret) = signature 
        req.user = decoded.user; //NOTE assign value(decoded) to req.user
        //NOTE req.user now maintain information in payload which is user.id.
        next(); //Callback function
    
    }catch(err){
        res.status(401).json({msg:'Token is not valid'});
    
    }
    
    }