import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOADUSER,
    LOADUSER_FAIL,
    LOGOUT
} from '../actions/types';

const initialState = {
    users:[],
    user:null,
    loading: true,
    isAuthenticated: false,
    token: localStorage.getItem('token'),
    error:{}
}

export default function(state = initialState, action){
    const {type, payload} = action; 
    switch(type){
        case REGISTER_SUCCESS: 
            return {
                ...state,
                loading: false 
            }
        case REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                error: payload  
            }
        case LOGIN_SUCCESS: 
            localStorage.setItem('token', payload.token); //NOTE set token that was returned from the back-end
            return {
                ...state,
                ...payload,
                loading: false,      
            }
        case LOGIN_FAIL: 
            return {
                ...state, 
                loading: false, 
                isAuthenticated:false,
                error: payload
            }
        
        case LOGOUT: 
        localStorage.removeItem('token');
            return {
                ...state,
                loading: false, 
                isAuthenticated: false,
                token:localStorage.getItem('token'),
                user:null
            }

        case LOADUSER:
            return {
                ...state,
                user: payload, 
                isAuthenticated: true,
                loading: false,
            }

        default: 
            return state;
            
    }
}