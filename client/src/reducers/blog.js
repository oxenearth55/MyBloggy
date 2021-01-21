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
    EDIT_BLOG,
    CREATE_COMMENT,
    DELETE_COMMENT,
    EDIT_COMMENT,
    LIKE_COMMENT,
    UNLIKE_COMMENT,
    DEFAULT_SUCCESS,
    DELETE_BLOG,
    GET_COMMENTS,
    UPDATE_PAGINATION
} from '../actions/types';

const initialState = {
    blogs: [], 
    myBlogs:[],
    blog: null,
    isCreated: false,
    loading: true,
    blogId: null,
    error:{},
    success:false,
    deleteSuccess: false
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
        case GET_COMMENTS: 
            return {
                ...state,
                blog: {...state.blog, pagination:payload.pagination ,comments:payload.comments}
            }
        case CREATE_COMMENT:
        case LIKE_COMMENT:
        case UNLIKE_COMMENT:
        case EDIT_COMMENT:
            return {
                ...state,
                // NOTE update comments related to the current comments ( pagination )
                // comments is comments that are in the current page (pagination)
                // Update only the comment that match the condition
                // remain comennts are the same as before updating 
                blog: {...state.blog, pagination:payload.pagination ,comments: payload.comments.map(comment => comment._id ===
                     payload.comment._id ?
                     comment = payload.comment : comment )},
                success: true
            }
        case DELETE_COMMENT: 
            return{
                ...state,
                // NOTE update comments related to the current comments ( pagination )
                // comments is comments that are in the current page (pagination)
                // Update only the comment that match the condition
                // remain comennts are the same as before updating 
                blog: {...state.blog, pagination:payload.pagination, comments: payload.comments.filter(comment => comment._id !==
                     payload.comment)},
                success: true

            }
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
        case DELETE_BLOG: 
            return {
                ...state,
                deleteSuccess: true
            }
        
        case ADD_LIKE: 
        case UNLIKE:
            return {
                ...state,
                blog: {...state.blog, likes: payload}
            }   
        case DEFAULT_SUCCESS: 
            return {
                ...state,
                success: false,
                deleteSuccess: false
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