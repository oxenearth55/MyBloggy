// import { post } from '../../../routes/api/blogs';
import {
    GET_BLOGS,
    GET_BLOG,
    BLOG_ERROR,
    CLEAR_BLOG,
    CREATE_BLOG,
    CREATE_SUCCESS,
    CREATE_ERROR,
    GET_MY_BLOG,
    CLEAR_CREATED,
    ADD_LIKE,
    UNLIKE,
    EDIT_BLOG
} from '../actions/types';

const initialState = {
    blogs: [], 
    myBlogs:[],
    blog: null,
    isCreated: false,
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
        case EDIT_BLOG:
            return {
                ...state,
                blog: payload,
                loading: false
            };
        case GET_MY_BLOG:
            return {
                ...state, 
                myBlogs: payload, 
                loading: false
            };
        case CREATE_BLOG: 
            return {
                ...state,
                blogId:payload,
                isCreated: true,
                loading: false
            }
        case ADD_LIKE: 
        case UNLIKE:
            return {
                ...state,
                blog: {...state.blog, likes: payload}
            }       
        case CLEAR_BLOG: 
            return{
                ...state,
                blog: null,
                isCreated: false,
                loading: false
            }
        case CLEAR_CREATED: 
            return{
                ...state,
                isCreated: false,
                blogId: null
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