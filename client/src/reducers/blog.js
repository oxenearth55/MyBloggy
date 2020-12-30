import {
    GET_BLOGS,
    GET_BLOG,
    BLOG_ERROR,
    CLEAR_BLOG,
    CREATE_BLOG,
    CREATE_SUCCESS,
    CREATE_ERROR
} from '../actions/types';

const initialState = {
    blogs: [], 
    blog: null,
    loading: true,
    blogId: null,
    error:{} 
}

export default function(state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case GET_BLOGS: 
            return {
                ...state,
                blogs: payload,
                loading: false
            };
        case GET_BLOG: 
            return {
                ...state,
                blog: payload,
                loading: false
            };
        case CREATE_BLOG: 
            return {
                ...state,
                blogId:payload,
                loading: false
            }
        case CLEAR_BLOG: 
            return{
                ...state,
                blog: null,
                loading: false
            }

        case BLOG_ERROR: 
        case CREATE_ERROR:
            return{
                ...state,
                error:payload,
                loading: false
            }
        default: 
            return state;

    }
}