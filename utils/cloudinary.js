require('dotenv').config(); 
const cloudinary = require('cloudinary').v2; 

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

uploads = (file, folder) => {
    return new Promise(resolve => {
    //  callback(void 0, result);
        cloudinary.uploader.upload(file, (result) => {
            resolve({
                url: result.url,
                id: result.public_id
            })
        }, {
            resource_type: "auto",
            folder: folder
        })
    })
    
}

module.exports = { cloudinary, uploads }; 