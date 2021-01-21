import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { getBlog, likeBlog, unlikeBlog, editBlog, deleteBlog, getComments } from '../actions/blog';
import Spinner from '../components/Spinner';
import Header from '../components/Header';
import {Image} from 'cloudinary-react';
import Moment from 'react-moment';
import Comment from './Comment';
import { withRouter } from 'react-router-dom'



const Blog = ({match, auth:{user} ,blog:{ blog, loading, success }, getBlog, likeBlog, unlikeBlog, editBlog, deleteBlog, history}) => {

    const [edit, setEdit] = useState(false);
    const [previewSource, setPreviewSource] = useState();
    const [isSubmit, setIsSubmit] = useState(false);
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
       init();
    },[edit])
    
    //NOTE Prevent props of undefined 
    const init = () => {
        if(blog !== null){
            setFormInfo({...formInfo, 
                topic: blog.topic, 
                type: blog.type, 
                content: blog.content
            })
            formData.set('topic', blog.topic);
            formData.set('type', blog.type);
            formData.set('content', blog.content);


        }
    }

    //SECTION Blog
    const displayBlog = props => (
        <div className="container-fluid">
            {blog !== null && !loading ? 
                <div className="blog">
                        <div className="row justify-content-between ">
                            <div className="col-lg-2 col-sm-12">
                                <Moment format='DD/MM/YYYY'>{blog.date}</Moment>
                            </div>
                            <div className="col-lg-8 col-sm-12 text-center my-4">
                                <h2>{blog.topic}</h2>
                            </div>     
                            <div className="like-dislike col-lg-2 col-sm-12 text-center"> 
                                <i onClick={() => likeBlog(blog._id)} className ="far fa-2x fa-thumbs-up green-text mx-2"><p>{blog.likes.length}</p></i>
                                <i onClick={() => unlikeBlog(blog._id)} className ="far fa-2x fa-thumbs-down red-text mx-2"></i>

                                {!edit && user !== null && user._id === blog.user._id &&  
                                      <i onClick={() => setEdit(true)} className="far fa-2x fa-edit mx-4 orange-text"></i> }  

                            </div> 
                    </div>
                
                    <div className="container blog-image">
                        <div className = "text-center my-3">
                            <div className= "col-12">
                                <Image className="image"  cloudName="dsrdvi9rl" publicId={blog.image}  crope="scale" />
                            </div>        
                        </div>
                        <p>{blog.content}</p>
                    </div>
                    
                    <Comment blog={blog} success={success}/>

                </div>

                
        :<Spinner/> }
        </div>
    )

    //SECTION Edit Form 
    const editForm = props => (
        <Fragment>
            <div className="d-flex justify-content-between">
                <h2>Edit Blog</h2>
                <div className="">  
                    <button onClick={()=>deleteBlog(blog._id, history)} className='btn btn-danger'>delete
                    <i className="fas fa-times white-text ml-2"></i>
                    
                    </button>
                </div>
            </div>
                      
                        <form onSubmit={handleSubbmitFile} className="form-outline my-3">
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Topic</label>
                            <input value={topic} onChange={handleChange('topic')} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                            <div id="emailHelp" className="form-text">You can edit the topic here</div>

                            <div className="col-2 mt-4 p-0">
                                <label for="exampleFormControlSelect1">Select type</label>
                                <select value={type} onChange={handleChange('type')} className="form-control" id="exampleFormControlSelect1">
                                    <option>Select</option>
                                    <option value={'Food'}>Food</option>
                                    <option value={'Technology'}>Technology</option>
                                    <option value={'Travel'}>Travel</option>
                                </select>
                            </div>

                            <div className="form-group mt-3">
                                <label for="exampleFormControlTextarea1">Content</label>
                                <textarea value={content} onChange={handleChange('content')} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>

                            {previewSource &&(
                                <div className="col-6 my-5 preview"> 
                                <img className="images" src={previewSource} alt ="Chosen" />
                                </div>
                            )}
                            <button className='btn btn-primary' type='submit'>Edit</button>
                            {isSubmit ? <button onClick={()=>setEdit(false)} className='btn btn-danger' type='submit'>Close</button>
                            :<button onClick={()=>setEdit(false)} className='btn btn-danger' type='submit'>Cancle</button>
                            }           
                        </div>
                        </form>
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
            console.log('topic is '+ formData.get('topic'));

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
            editBlog(formInfo,blog._id, history);
            setIsSubmit(true);
            
        }
    

    return (
        <Fragment>
            {blog !== null && !loading &&
                         <Header section ={blog.type} text={blog.type}/>
            } 
            
               {!edit?<div className="container-fluid blog my-4"> {displayBlog()}
                </div>    

               : 
               <div className="container my-4">
                    {editForm()} 
               </div>}
                                
        </Fragment>
    )
}
const mapStateToProps = state => ({
    blog: state.blog,
    auth: state.auth
});
export default connect(mapStateToProps, { getBlog, likeBlog, unlikeBlog, editBlog, deleteBlog})(withRouter(Blog));
