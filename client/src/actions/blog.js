import axios from 'axios'; 
import {
    GET_BLOGS,
    BLOG_ERROR,
    GET_BLOG,
    CREATE_BLOG,
    CREATE_SUCCESS,
    CREATE_ERROR,
    GET_MY_BLOG,
    CLEAR_CREATED,
    ADD_LIKE,
    UNLIKE,
    EDIT_BLOG,
    CLEAR_BLOG,
    CREATE_COMMENT,
    DELETE_COMMENT,
    EDIT_COMMENT,
    LIKE_COMMENT,
    UNLIKE_COMMENT,
    DEFAULT_SUCCESS,
    DELETE_BLOG,
    GET_COMMENTS,
    UPDATE_PAGINATION
} from './types';
import {
    setAlert
} from './alert';  

export const getBlogs = (amount) => async dispatch => {
    try{
        const res = await axios.get(`/api/blogs?limit=${amount}`);
        dispatch({
            type: GET_BLOGS,
            payload: res.data
        });

        dispatch({
            type: CLEAR_BLOG,
        });

        // dispatch({type: CLEAR_BLOG})

    }catch(err){
        dispatch({
            type: BLOG_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })

    }

}

export const getBlog = (id,pageNumber) => async dispatch => {  
    let number = 1
    if(pageNumber !== undefined && pageNumber !== null){
         number = pageNumber
    }  
    try{
        const res = await axios.get(`/api/blogs/${id}/${number}`) 
        dispatch({
            type: GET_BLOG,
            payload: res.data
        })
        // dispatch({type: CLEAR_CREATED })

    }catch(err){
        dispatch({
            type: BLOG_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }            
        })

    }
}

export const getMyBlogs = () => async dispatch => {
    try {
        const res = await axios.get('/api/blogs/get/myblogs'); 
        dispatch({
            type: GET_MY_BLOG,
            payload: res.data
        })
        dispatch({
            type: CLEAR_BLOG,
        });

        
    } catch (err) {
        dispatch({
            type: BLOG_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }            
        })
        
    }
} 

export const createBlog = (formData) => async dispatch => {
    
    try {

        const config = {
            headers:{
                'Content-Type' :  'application/json'
            }
        }
        // const body = JSON.stringify(formInfo);

        const res = await axios.post('/api/blogs',formData,config);
        dispatch({
            type: CREATE_BLOG,
            payload: res.data._id
        })
    
        dispatch(setAlert('Create Blog Success', 'success'));
        dispatch({type: CLEAR_CREATED })

       
        
    } catch (err) {
        const errors = err.response.data.errors; 
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
       
        dispatch({
            type: CREATE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }            
        })
        
    }
}

export const likeBlog = (id) => async dispatch => {
    try {
        const res = await axios.put(`/api/blogs/like/${id}`);
        dispatch({
            type: ADD_LIKE,
            payload: res.data
        })
        dispatch(setAlert('Like success','success'));
        dispatch({type: DEFAULT_SUCCESS})
        
    } catch (err) {
        const error = err.response.data; 
        if(error){
            dispatch(setAlert(error.msg, 'danger'));
        }   
        dispatch({
            type: BLOG_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }            
        })

    }
}

export const unlikeBlog = (id) => async dispatch => {
    try {
        const res = await axios.put(`/api/blogs/unlike/${id}`);
        dispatch({
            type: UNLIKE,
            payload: res.data
        })
        dispatch(setAlert('Unlike success', 'success'));
        
    } catch (err) {
        const error = err.response.data; 
        if(error){
            dispatch(setAlert(error.msg, 'danger'));
        }
        dispatch({
            type: BLOG_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }            
        })  
    }
}

export const editBlog = (formInfo,id) => async dispatch => {
    try {
        const config = {
            headers:{
                'Content-Type' :  'application/json'
            }
        }
        const res = await axios.put(`/api/blogs/${id}`,formInfo,config); 
        dispatch({
            type: EDIT_BLOG,
            payload: res.data
        })
        dispatch(setAlert('Update blog success', 'success'));
        
    } catch (err) {
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: BLOG_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }            
        })
        
    }
}

export const createComment = (formData,id, comments) => async dispatch => {
    try {
        const config = {
            headers:{
                'Content-Type': 'application/json'
            } 
        }
        const res = await axios.put(`/api/blogs/comment/${id}`, formData, config);
        const pagination = await getPagination(id)

        dispatch({
            type: CREATE_COMMENT,
            payload: {comment:res.data, comments: comments, pagination:pagination}
        })
        dispatch(setAlert('Create blog success', 'success'));  
        dispatch({
            type: DEFAULT_SUCCESS
        })    
       
    } catch (err) {
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: BLOG_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }            
        })
        
    }
}

export const likeComment = (blogId, commentId, comments) => async dispatch => {
    try {     
        const res = await axios.put(`/api/blogs/comment/like/${blogId}/${commentId}`);
        const pagination = await getPagination(blogId)

        dispatch({
            type: LIKE_COMMENT, 
            payload: {comment:res.data, comments: comments, pagination:pagination}
        })
        dispatch(setAlert('Like comment success', 'success'));
        dispatch({
            type: DEFAULT_SUCCESS
        })     
        
    } catch (err) {
        const error = err.response.data; 
        if(error){
            dispatch(setAlert(error.msg, 'danger'));
        }     
        dispatch({
            type: BLOG_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }            
        })
    }
}

export const unlikeComment = (blogId, commentId, comments) => async dispatch => {
    try {     
        const res = await axios.put(`/api/blogs/comment/unlike/${blogId}/${commentId}`);
        const pagination = await getPagination(blogId)

        dispatch({
            type: UNLIKE_COMMENT, 
            payload: {comment:res.data, comments: comments, pagination:pagination}
        })
        dispatch(setAlert('Unlike comment success', 'success'));
        dispatch({
            type: DEFAULT_SUCCESS
        })     
        
    } catch (err) {
        const error = err.response.data; 
        if(error){
            dispatch(setAlert(error.msg, 'danger'));
        }     
        dispatch({
            type: BLOG_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }            
        })
    }
}

export const editComment = (formData,blogId, commentId, comments) => async dispatch => {
    try {

        const config = {
            headers:{
                'Content-Type': 'application/json'
            } 
        }
        const res = await axios.put(`/api/blogs/comment/edit/${blogId}/${commentId}`,formData, config);
        const pagination = await getPagination(blogId)

        dispatch({
            type:EDIT_COMMENT,
            payload: {comment:res.data, comments: comments, pagination:pagination}
        })

        dispatch(setAlert('Edit comment success', 'success'));
        dispatch({
            type: DEFAULT_SUCCESS
        })     



        
    } catch (err) {
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: BLOG_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }            
        })
    }
}

export const deleteBlog = (id, history) => async dispatch => {
    try{
        const res = await axios.delete(`/api/blogs/${id}`);
        dispatch({
            type: DELETE_BLOG, 
            payload: res.data
        })
        dispatch(setAlert('Delete blog success', 'success'));
        history.push('/dashboard');

    }catch(err){
        const error = err.response.data; 
        if(error){
            dispatch(setAlert(error.msg, 'danger'));
        }     
        dispatch({
            type: BLOG_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }            
        })
    }
}


export const deleteComment = (blogId, commentId, comments) => async dispatch => {
    try{
        const res = await axios.put(`/api/blogs/comment/${blogId}/${commentId}`);
        const pagination = await getPagination(blogId)
        dispatch({
            type: DELETE_COMMENT, 
            payload: {comment:commentId, comments: comments, pagination:pagination}
        })
        dispatch(setAlert('Delete comment success', 'success'));
        dispatch({
            type: DEFAULT_SUCCESS
        })     
    }catch(err){
        const error = err.response.data; 
        if(error){
            dispatch(setAlert(error.msg, 'danger'));
        }     
        dispatch({
            type: BLOG_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }            
        })
    }
}


export const getComments = (blogId, pageNumber) => async dispatch => {
    // const pageNumber = 1
    // if(pageNumber !== null){
    //    return pageNumber == pageNumber
    // }
    try {
        //NOTE Grab comments as an pagination
        const res = await axios.get(`/api/blogs/pagination/page/${blogId}/${pageNumber}`)
        const pagination = await getPagination(blogId)

        dispatch({
            type:GET_COMMENTS, 
            payload: {comments:res.data, pagination:pagination}
        })
          
    } catch (error) {
        
    }
  
}

export const  getPagination = async (id) => {
    const res = await axios.get(`/api/blogs/comment/pagination/number/${id}`)
    return res.data
}