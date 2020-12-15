
import {
    setAlert
} from './alert'; 
import axios from 'axios';
import { REGISTER_SUCCESS,
    REGISTER_FAIL

} from './types';


//SECTION SignUp
export const register = ({formData}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify(formData);
    try{
        await axios.post('/api/users',body,config);
        dispatch({
            type: REGISTER_SUCCESS
        })
        dispatch(setAlert('Register Success', 'success'));

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