const express = require('express');
const connectDB = require('./config/db');
const path = require('path')

const app = express(); 


connectDB();

//SECTION middle ware
app.use(express.json({extended: false})); //NOTE Allow us to read the request.body

//NOTE For accepting the image file size 
app.use(express.json({ limit: '50mb'})); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// SECTION Routes 
 app.use('/api/users', require('./routes/api/users'));
 app.use('/api/auth', require('./routes/api/auth'));
 app.use('/api/blogs', require('./routes/api/blogs'));

 //NOTE Serve static assets to production
 if(process.env.NODE_ENV === 'production'){
     //NOTE Set static folder 
     app.use(express.static('client/build'));
     app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
     });
 }


const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));