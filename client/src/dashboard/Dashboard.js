import React, {Fragment, useState, useEffect} from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import AddBlog from './AddBlog';
import axios from 'axios';
import {Image} from 'cloudinary-react';

const Dashboard = ({auth: { user, loading }}) => {
    const [addBlog, setAddBlog] = useState(false);
    const [fileInputState, setFileInputState] = useState('');
    const [imageId, setImageId] = useState();
    const [previewSource, setPreviewSource] = useState();
    const [previewSource2, setPreviewSource2] = useState();

    const image = [];
    const [file1, setFile1] = useState();
    const [file2, setFile2] = useState();


    const [image, setImage] = useState(
        
    );
    const [formData, setFormData] = useState({
        file1:null,
        file2:null
    })

    // const image = []
    
    useEffect( () => {
        loadImage();
    },[]);

    const AddBlogBtn = () => (
        <Fragment>
            {!addBlog ? <button onClick={() => setAddBlog(true)} type="button" class="btn btn-outline-primary" data-mdb-ripple-color="dark">
                            Add Blog
                        </button> : 
                        <button onClick={() => setAddBlog(false)} type="button" class="btn btn-danger">Close</button>    
            }       
        </Fragment>
       
    )

    const handleChange = name => e =>{
        const file =e.target.files[0];
        // setFormData({...formData, [name]: file})
        if(name === 'file1'){
            previewFile(file, name);
            setFile1(file);
        }
        else if(name === 'file2'){
            previewFile(file, name)
            setFile2(file);

        }
        // setTest(e.target.files[0]);
        // setImage(file)
        }

    const previewFile = (file, name) => {
        const reader = new FileReader(); //NOTE Read the content of a file stored on the user's computer
        reader.readAsDataURL(file) //NOTE Convert img to String URL
        reader.onloadend = () =>{
            if(name === 'file1'){
                setPreviewSource(reader.result) //NOTE get raw string as base 64 encoded image
            } else if(name === 'file2'){
                setPreviewSource2(reader.result)
            }
            // setImage(reader.result)
            // image.push(reader.result);
console.log('array is' + image[0])
        }

    }

    const handleSubbmitFile = (e) => {
        e.preventDefault(); //NOTE prevent from reload the page 

        if(file1){
            image.push(file1)
        }if(file2){
            image.push(file2);
        }
        console.log('Array of file is '+ image);
        if(!previewSource || !previewSource2) return; 
        uploadImage(image);
        
    }

    const uploadImage = async (base64EncodedImage) => {
        try {

            const config = {
                headers:{
                    'Content-Type' :  'application/json'
                }
            }
            const body = JSON.stringify({image: image});

            

            await axios.post('/api/blogs/multer', body, config);

            // await fetch('/api/blogs/multer', {
            //     method: 'POST',
            //     body: JSON.stringify({data: image}), 
            //     headers: {'Content-Type' : 'application/json'}
            // })

            
            
        } catch (error) {
            console.log(error);
        }

    }

    const loadImage = async () => {
        try {
            const res = await fetch('/api/blogs/image');
            const data = await res.json();
            setImageId(data);

        } catch (error) {
            
        }
    }


    return (
       
        <Fragment>
            <Header section='dashboard' text='Dashboard'/>

            <Image  cloudName="dsrdvi9rl" publicId='nhotmpbfozf1njml4s8n' width="300" crope="scale" />


             <Fragment>
                <div className=" container my-2">
                    {/* SECTION Add Blog */}
                    <div className="d-flex justify-content-end">
                        {AddBlogBtn()}
                    </div>
                    {addBlog ?
                    <form onSubmit={handleSubbmitFile} className="form-outline">
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Topic</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">You can create the great thing here</div>

                        <div className="col-2 mt-4 p-0">
                            <label for="exampleFormControlSelect1">Select type</label>
                            <select class="form-control" id="exampleFormControlSelect1">
                                <option>Select</option>
                                <option>Food</option>
                                <option>Technology</option>
                                <option>Travel</option>
                            </select>
                        </div>

                    
                        <div class="form-group mt-4">
                            <label for="exampleFormControlFile1">Example file input</label>
                            <input onChange={handleChange('file1')} type="file" class="form-control-file" id="exampleFormControlFile1"  accept="image/*" multiple/>

                            <label for="exampleFormControlFile1">Example file input</label>
                            <input onChange={handleChange('file2')} type="file" class="form-control-file" id="exampleFormControlFile1"  accept="image/*"/>

                        </div>

                        {previewSource && (
                            <img src={previewSource} alt ="Chosen" style={{height: '300px'}}/>
                        )}

                        {previewSource2 && (
                            <img src={previewSource2} alt ="Chosen" style={{height: '300px'}}/>
                        )}


                        <button className='btn btn-danger' type='submit'>Submit</button>
                       
                    </div>
                    </form> : <Fragment></Fragment>
                    }

                     {/* SECTION Table */}
                    {user !== null && !loading && !addBlog ? 
                    <table class="table table-striped table-hover ">
                        <thead>
                            <tr>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                            </tr>
                        </tbody>
                    </table>
                      : !addBlog ? <Spinner/> : <Fragment></Fragment>}
                </div>
             </Fragment>
             
           
           
        </Fragment>
      
    )
}
const mapStateToProps = state => ({
    auth : state.auth
});

export default connect(mapStateToProps) (Dashboard);
