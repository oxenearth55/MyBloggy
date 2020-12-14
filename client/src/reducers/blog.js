import {
    GET_BLOGS,
    BLOG_ERROR,
    CLEAR_BLOG
} from '../actions/types';

const initialState = {
    blogs: [], 
    blog: null,
    loading: true,
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
        case BLOG_ERROR: 
            return{
                ...state,
                error:payload,
                loading: false
            }
        default: 
            return state;

    }
}