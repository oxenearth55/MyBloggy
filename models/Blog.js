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
        type: ObjectId,
        ref:'user'
    },
    
    likes:[{
       user:{ 
            type:  ObjectId,
            ref:'user'
       }
    }],

    section:[{
        pic1:{
            type: String
        },
        pic2: {
            type: String
        },
        pic3: {
            type: String
        }, 
        text1: {
            type: String
        },
        text2: {
            type: String
        },
        text3: {
            type: String
        },
        header:{
            type:String
        },
        sub_header1:{
           type: String
        },
        sub_header2:{
            type: String
         },
         sub_header3:{
            type: String
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