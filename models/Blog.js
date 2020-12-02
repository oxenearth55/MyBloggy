const mongoose = require('mongoose'); 
const { ObjectId } = mongoose.Schema;


const BlogSchema = new mongoose.Schema({
    topic:{
        type: String, 
        required: true
    }, 
    type:{
        type: String,
        required: true
    },
    content:{
        type: String, 
        required: true
    }, 
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    
    likes:[{
       user:{ 
            type: ObjectId,
            ref:'user'
       }
    }],

    comments:[{
        user:{
            type: ObjectId,
            ref:'user'
        },
        text:{
            type: String,
            required: true
        },
        name:{
            type: String, 
        },
        likes:[{
            user:{
                type: ObjectId,
                ref:'user'
            }
        }],
        date:{
            type: Date,
            default: Date.now
        }
    }],
    
    date:{
        type: Date,
        default:Date.now
    }
})

module.exports = Blog = mongoose.model('blog', BlogSchema );