import React, { useState, Fragment, useEffect } from 'react';
import Moment from 'react-moment';
import AddComment from './AddComment';
import EditComment from './EditComment';
import { connect } from 'react-redux';
import { likeComment, getBlog, unlikeComment, deleteComment } from '../actions/blog'


const Comment = ({auth:{user}, success, blog:{blog}, likeComment, getBlog, unlikeComment, deleteComment}) => {
    const [addComment, setAddComment] = useState(false);
    // const [edit, setEdit] = useState(false);
    const [formData, setFormData] = useState({
        comment: null,
        edit:false
    })

    const { comment, edit } = formData;
    const cancleCreate = () => {
        setAddComment(false);
    }

    const cancleEdit = () => {
        setFormData({...formData, edit:false});
    }

    useEffect(() => {
        if(success == true){
        getBlog(blog._id) //NOT wait update like comment so it will use old value
        }

    },[success])

    const header = props => (
        <div className="row justify-content-center">              
            <div className="col-8">
                <h2 className="text-center">Comments</h2>
            </div>
            <div className="add-comment">
                {!addComment && 
                    <i onClick={() => setAddComment(true)} class="fas fa-2x fa-plus-circle blue-text"></i>
                }
            </div>
        </div>

    )
    const comments = props => (
        <Fragment>
            {blog !== null && blog.comments.map(comment => 
                <div className="row justify-content-cente my-4">            
                    <div className="col-4 ml-4 comment-profile">
                        <div className="d-flex justify-content-between border">
                        <img src={comment.user.avatar} alt="" className="rounded-circle border"/>
                        <div className="text-center">
                            <p><span>Name:</span> {comment.user.firstName}</p>
                        </div>
                        <div></div>
                        </div>
                      
                        
                    </div>
                    <div className="col-6 border">
                        <div className="comment-header border-bottom p-2">
                            <div className="d-flex justify-content-between">
                                <div className=""> 
                                    <Moment format='DD/MM/YYYY'>{comment.date}</Moment>
                                </div>
                            
                                <div className="like-dislike ">
                                    <i onClick={() => likeComment(blog._id,comment._id)} className ="far fa-thumbs-up green-text mx-2"><p>{comment.likes.length}</p></i>
                                    <i onClick={() => unlikeComment(blog._id, comment._id)}  className ="far fa-thumbs-down red-text mx-2"></i>
                                    {user !== null && user._id === comment.user._id &&
                                    <Fragment>
                                        <i onClick={() => setFormData({edit:true, comment:comment})} className="far  fa-edit mx-2 orange-text"></i>  
                                        <i onClick={() => deleteComment(blog._id, comment._id)} className="far fa-trash-alt mx-2 red-text"></i> 
                                    </Fragment>
                                     
                                      }
                                  
                                </div>
                            </div>
                      </div>
                        <div className="text p-4">
                        {comment.text}
                        </div>
                    </div>
                </div>
        
        )}
        </Fragment>
       
      
        
    )
    return (
        <div className="comments my-4">
            {header()}
            <div className="display-comments my-4">
                {addComment && <div className="container my-5">
                         <AddComment cancleCreate={cancleCreate} blog={blog}/>
                         </div>}
                {edit && <div className="container my-5">
                         <EditComment cancleEdit={cancleEdit} comment={comment}/>
                         </div> }
                    {comments()}        
            </div>                   
        </div>
    )
}
const mapStateToProps = state => ({
    blog: state.blog, 
    auth: state.auth
})

export default connect(mapStateToProps,{ likeComment, getBlog, unlikeComment, deleteComment })(Comment);
