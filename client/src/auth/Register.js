import React, {useState} from 'react';
import axios from 'axios';
// SECTION Photo 
import registerPhoto from '../photo/auth/register.jpg'


const Register = () => {
    const [info, setInfo] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:''
    })

    const handleChange = name => e => {
        setInfo({...info, [name]: e.target.value });
    }

    function submitRegister(){
        try{

        }catch(err){

        }

    }

    return (
        <div className="container-fluid pl-0">
        <div className="row">
            {/* SECTION Picture */}
            <div className="col-6">
                <div className="auth-image">
                    <img src={registerPhoto} alt=""/>           
                </div>  
            </div>
             
            {/* SECTION Login Form */}
            <div className="col-6 mt-5">
                <h2 className="text-center">To be a part of MyBloggy</h2>
               
               {/* SECTION Input Fields */}
                <div className="row auth-field mt-5 mb-3">
                    <div className="col-6 mb-3">
                        <p>First Name</p>
                        <input onChange={handleChange('firstName')} type="text" className="form-control" placeholder="First name" aria-label="First name"/>
                    </div>

                    <div className="col-6 mb-3">
                        <p>Last Name</p>
                        <input onChange={handleChange('lastName')} type="text" className="form-control" placeholder="Last name" aria-label="Last name"/>
                    </div>

                    <div className="col-6 mb-3">
                        <p>Email</p>
                        <input onChange={handleChange('email')} type="email" className="form-control" id="inputEmail4" placeholder="Email"/>
                    </div>
                
                    <div className="col-6 mb-3">
                        <p>Password</p>
                        <input onChange={handleChange('password')} type="text" className="form-control" placeholder="password"/>
                    </div>

                   
                  
                </div>

                <div className="auth-btn">
                        <button type="button" className="btn btn-primary ">SignUp</button>

                    </div>
                       
              
            </div>     
    </div>
   
    </div>

    )
}

export default Register;
