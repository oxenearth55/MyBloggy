
import {
    setAlert
} from './alert'; 
import axios from 'axios';
import { REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOADUSER,
    LOADUSER_FAIL

} from './types';
import setAuthToken from '../utils/setAuthToken';

import store from '../Store';

//SECTION SignUp
export const register = ({formData}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify(formData);
    try{
       //NOTE Can not use axios because dispatch not working
        await axios.post('/api/users',body,config);
        
         store.dispatch({
            type: REGISTER_SUCCESS
        })
         store.dispatch(setAlert('Register Success', 'success'));
       

    }catch(err){
        const errors =err.response.data.errors;
        if(errors){
           errors.forEach(error => dispatch(setAlert(error.msg, 'danger'))); 
        }
        dispatch({
            type: REGISTER_FAIL,
            payload: {msg: err.response.statusText, status: err.response.status}

        })
    }
}


//SECTION SignIn

export const login = ({ formData }) => async dispatch => {
    const config = {
        headers:{
            'Content-Type' :  'application/json'
        }
    }
    const body = JSON.stringify(formData);
   
    try{
        //NOTE Grab token from api 
        const res = await axios.post('/api/auth', body, config); 
        
        dispatch({
            type: LOGIN_SUCCESS, //NOTE This action will set the token into the local storage
            payload: res.data //NOTE return token
        })
        dispatch(setAlert('Log in Success', 'success'));
        dispatch(loadUser());

    }catch(err){
        const errors = err.response.data.errors; 
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: LOGIN_FAIL,
            payload: {msg: err.response.statusText, status: err.response.status}

        })

    }
}

//SECTION Load user 
 export const loadUser = () => async dispatch => {
     const token = localStorage.token;
     if(token){
         setAuthToken(token); //NOTE set default header of axios (token)
     }
     try{
        const res = await axios.get('/api/auth'); //NOTE send token (default) to grab user info

        dispatch({
            type: LOADUSER,
            payload: res.data //NOTE store user data to payload 
        })

     }catch(err){
         dispatch({
             type: LOADUSER_FAIL,
            })
         
     }
    

}