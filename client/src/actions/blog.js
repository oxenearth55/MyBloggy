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
    CLEAR_BLOG
} from './types';
import {
    setAlert
} from './alert';  

export const getBlogs = () => async dispatch => {
    try{
        const res = await axios.get('/api/blogs');
        dispatch({
            type: GET_BLOGS,
            payload: res.data
        });

        // dispatch({type: CLEAR_BLOG})

    }catch(err){
        dispatch({
            type: BLOG_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })

    }

}

export const getBlog = (id) => async dispatch => {
    try{
        const res = await axios.get(`/api/blogs/${id}`); 
        dispatch({
            type: GET_BLOG,
            payload: res.data
        })
        dispatch({type: CLEAR_CREATED })

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
            type: 'CREATE_BLOG',
            payload: res.data._id
        })

        dispatch(setAlert('Create Blog Success', 'success'));
    
        
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