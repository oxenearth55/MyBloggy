import React, { useState, Fragment, useEffect } from 'react';
import Moment from 'react-moment';
import AddComment from './AddComment';
import { connect } from 'react-redux';
import { likeComment, getBlog } from '../actions/blog'


const Comment = ({success, blog, likeComment, getBlog}) => {
    const [addComment, setAddComment] = useState(false);
    const [like, setLike] = useState(false);

    const cancleCreate = () => {
        setAddComment(false);
    }

    useEffect(() => {
        getBlog(blog._id) //NOT wait update like comment so it will use old value

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
            {blog.comments.map(comment => 
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
                                    <i  className ="far fa-thumbs-down red-text mx-2"></i>
                                    <i  className="far  fa-edit mx-2 orange-text"></i>   
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
                    {comments()}        
            </div>                   
        </div>
    )
}

export default connect(null,{ likeComment, getBlog })(Comment);
