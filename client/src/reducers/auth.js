import {
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../actions/types';

const initialState = {
    users:[],
    user:null,
    loading: true,
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

        default: 
            return state;
            
    }
}