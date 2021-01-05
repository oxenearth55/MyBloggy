import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { getBlog, likeBlog, unlikeBlog, editBlog } from '../actions/blog';
import Spinner from '../components/Spinner';
import Header from '../components/Header';
import {Image} from 'cloudinary-react';
import axios from 'axios';
import Moment from 'react-moment';


const Blog = ({match, blog:{ blog, loading }, getBlog, likeBlog, unlikeBlog, editBlog}) => {

    const [edit, setEdit] = useState(false);
    const [previewSource, setPreviewSource] = useState();
    const [formInfo, setFormInfo] = useState({
        topic: '',
        type: '',
        content:'',
        image:null,
        formData: new FormData()
    });

    const {topic, type, content, image, formData } = formInfo;

    useEffect(() => {
        getBlog(match.params.id);
    },[getBlog])

    //SECTION Blog
    const displayBlog = props => (
        <Fragment>
            {blog !== null && !loading ? 
                <div>
                    <Header section ={blog.type} text={blog.type}/>
                    <div className="container-fluid blog my-4">
                        <div className="d-flex flex-row justify-content-between ">
                            <div>
                                <Moment format='DD/MM/YYYY'>{blog.date}</Moment>
                            </div>
                            <div>
                                <h2>{blog.topic}</h2>
                            </div>                       
                            <div className="like-dislike"> 
                                <i onClick={() => likeBlog(blog._id)} className ="far fa-2x fa-thumbs-up green-text mx-2"><p>{blog.likes.length}</p></i>
                                <i onClick={() => unlikeBlog(blog._id)} className ="far fa-2x fa-thumbs-down red-text mx-2"></i>
                                {edit ? <i onClick={() => setEdit(false)} className="fas fa-2x fa-times mx-4 red-text"></i> 
                                :   <i onClick={() => setEdit(true)} className="far fa-2x fa-edit mx-4 orange-text"></i> }    
                            </div> 
                    </div>
                
                    <div className="container">
                        <div className = "text-center my-3">
                            <div className= "col-12">
                                <Image className="image"  cloudName="dsrdvi9rl" publicId={blog.image} width="300" crope="scale" />
                            </div>        
                        </div>
                        <p>{blog.content}</p>
                    </div>
                    </div>
                </div>
        :<Spinner/> }
        </Fragment>
    )

    //SECTION Edit Form 
    const editForm = props => (
        <Fragment>
            <div className="container">
                        <h2>Edit Blog</h2>
                        <form onSubmit={handleSubbmitFile} className="form-outline my-3">
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Topic</label>
                            <input value={topic} onChange={handleChange('topic')} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                            <div id="emailHelp" className="form-text">You can edit the topic here</div>

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

                        
                            {/* <div className="form-group mt-4">
                                <label for="exampleFormControlFile1">Select Image</label>
                                <input name="image" onChange={handleChange('image')} type="file" className="form-control-file" id="exampleFormControlFile1"  accept="image/*"/>

                            </div> */}

                            {previewSource &&(
                                <div className="col-6 my-5"> 
                                <img src={previewSource} alt ="Chosen" style={{height: '300px'}}/>
                                </div>
                            )}
                            <button className='btn btn-primary' type='submit'>Edit</button>
                            <button onClick={()=>setEdit(false)} className='btn btn-danger' type='submit'>Cancle</button>

                        
                        </div>
                        </form>
                    </div>
                    </Fragment>
    )

    //ANCHOR Functions
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
            }
        }
        //NOTE When user click close button, the image will disapear automatically
        else{
            setPreviewSource('')
        }
        }

        const handleSubbmitFile = (e) => {
            e.preventDefault(); //NOTE prevent from reload the page 
            editBlog(blog._id, formData);
        }
    

    return (
        <Fragment>
            
            {!edit?displayBlog(): editForm()}
            
                     
        </Fragment>
    )
}
const mapStateToProps = state => ({
    blog: state.blog
});
export default connect(mapStateToProps, { getBlog, likeBlog, unlikeBlog, editBlog })(Blog);
