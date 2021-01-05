import React, {Fragment, useState, useEffect} from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import AddBlog from './AddBlog';
import axios from 'axios';
import {Image} from 'cloudinary-react';
import {createBlog, getMyBlogs } from '../actions/blog';
import Blogs from './Blogs';
import { withRouter, Redirect } from 'react-router-dom';

const Dashboard = ({auth: { user, loading }, blog: { myBlogs, isCreated, blogId} , createBlog, getMyBlogs}, history) => {
    const [addBlog, setAddBlog] = useState(false);
    const [imageId, setImageId] = useState();
    const [previewSource, setPreviewSource] = useState();

    const [formInfo, setFormInfo] = useState({
        topic: '',
        type: '',
        content:'',
        image:null,
        formData: new FormData()
    });

    const {formData } = formInfo

    
    useEffect( () => {
        getMyBlogs();
    },[]);

    function RedirectUser (){
        if(isCreated == true){
            return <Redirect to = {`/blog/${blogId}`} />
        }
    }
    //NOTE After user clicked close, formInfo will be cleared
    const clearForm = () => {
        setFormInfo({
            topic:'',
            type: '',
            content: '',
            image: null,
            formData: new FormData()
                })
                formData.delete('topic');
                formData.delete('type');
                formData.delete('content');
                formData.delete('image');
                previewFile(null)

        setAddBlog(false)
    }
    const AddBlogBtn = () => (
        <Fragment>
            {!addBlog ? <button onClick={() => setAddBlog(true)} type="button" className="btn btn-outline-primary" data-mdb-ripple-color="dark">
                            Add Blog
                        </button> : 
                        <button onClick={() => clearForm()} type="button" className="btn btn-danger">Close</button>    
            }       
        </Fragment>
       
    )

    const handleChange = name => e => {

        const value = name == 'image'? e.target.files[0] : e.target.value;

        if(name == 'image'){
              //NOTE Create an instance of FileReader API

              setFormInfo({...formInfo, [name]: value});
              formData.set(name, value);
              console.log('image is '+ formInfo.image);
              previewFile(value);
        
        }else{
            setFormInfo({...formInfo, [name]: value});
            formData.set(name, value);   
        }
        }

    const previewFile = (file) => {
        if(file !== null){
        const reader = new FileReader(); //NOTE Read the content of a file stored on the user's computer
        reader.readAsDataURL(file) //NOTE Convert img to String URL
        reader.onloadend = () =>{
            setPreviewSource(reader.result) //NOTE get raw string as base 64 encoded image
            // setImage(reader.result)
            // image.push(reader.result);
        }
    }
    //NOTE When user click close button, the image will disapear automatically
    else{
        setPreviewSource('')
    }
    }

    const handleSubbmitFile = (e) => {
        e.preventDefault(); //NOTE prevent from reload the page 
        createBlog(formData);
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
            {RedirectUser()}
            <Header section='dashboard' text='Dashboard'/>

            {/* <Image  cloudName="dsrdvi9rl" publicId='nhotmpbfozf1njml4s8n' width="300" crope="scale" /> */}
             <Fragment>
                <div className=" container my-2">
                    {/* SECTION Add Blog */}
                    <div className="d-flex justify-content-end">
                        {AddBlogBtn()}
                    </div>
                    {addBlog &&
                    <Fragment>
                        <h2>Create Blog</h2>
                        <form onSubmit={handleSubbmitFile} className="form-outline my-3">
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Topic</label>
                            <input onChange={handleChange('topic')} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                            <div id="emailHelp" className="form-text">You can create the great thing here</div>

                            <div className="col-2 mt-4 p-0">
                                <label for="exampleFormControlSelect1">Select type</label>
                                <select onChange={handleChange('type')} className="form-control" id="exampleFormControlSelect1">
                                    <option>Select</option>
                                    <option value={'Food'}>Food</option>
                                    <option value={'Technology'}>Technology</option>
                                    <option value={'Travel'}>Travel</option>
                                </select>
                            </div>

                            <div className="form-group mt-3">
                                <label for="exampleFormControlTextarea1">Content</label>
                                <textarea onChange={handleChange('content')} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>

                        
                            <div className="form-group mt-4">
                                <label for="exampleFormControlFile1">Select Image</label>
                                <input name="image" onChange={handleChange('image')} type="file" className="form-control-file" id="exampleFormControlFile1"  accept="image/*"/>

                            </div>

                            {previewSource &&(
                                <div className="col-6 my-5"> 
                                <img src={previewSource} alt ="Chosen" style={{height: '300px'}}/>
                                </div>
                            )}
                            <button className='btn btn-danger' type='submit'>Submit</button>
                        
                        </div>
                        </form>
                    </Fragment>
                    }

                     {/* SECTION Table */}
                    {user !== null && !loading && !addBlog ? 
                    <Fragment>
                        {/* SECTION User details */}
                    <h2 className="">User details </h2>
                    <table className="table table-striped table-hover ">
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

                        {/* SECTION User's Blogs */}
                    <h2 className="">My Blogs </h2>
                        <Blogs blogs={myBlogs}  />

                    </Fragment> 

                    



                      : !addBlog ? <Spinner/> : <Fragment></Fragment>}
                </div>
             </Fragment>
             
           
           
        </Fragment>
      
    )
}
const mapStateToProps = state => ({
    auth : state.auth,
    blog: state.blog
});

export default connect(mapStateToProps,{ createBlog, getMyBlogs}) (withRouter(Dashboard));
