import axios from 'axios'; 
import {
    GET_BLOGS,
    BLOG_ERROR,
    GET_BLOG
} from './types';

export const getBlogs = () => async dispatch => {
    try{
        const res = await axios.get('/api/blogs');
        dispatch({
            type: GET_BLOGS,
            payload: res.data
        });

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

    }catch(err){
        dispatch({
            type: BLOG_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }            
        })

    }
}