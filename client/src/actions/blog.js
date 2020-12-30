import axios from 'axios'; 
import {
    GET_BLOGS,
    BLOG_ERROR,
    GET_BLOG,
    CREATE_BLOG,
    CREATE_SUCCESS,
    CREATE_ERROR
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

export const createBlog = ({formInfo}) => async dispatch => {
    try {
        const config = {
            headers:{
                'Content-Type' :  'application/json'
            }
        }
        const body = JSON.stringify(formInfo);

        const res = await axios.post('/api/blogs',body,config);
        dispatch({
            type: 'CREATE_BLOG',
            payload: res.data.id
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