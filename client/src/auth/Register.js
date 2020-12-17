import React, { useState } from 'react';
//ANCHOR Redux
import { register } from '../actions/auth';
import { connect } from 'react-redux';

// ANCHOR Photo 
import registerPhoto from '../photo/auth/register.jpg';


const Register = ({ register }) => {
    const [formData, setFormData] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:''
    })
    //NOTE Destructuring
    const {firstName, lastName, email, password} = formData;

    const handleChange = name => e => {
        setFormData({...formData, [name]: e.target.value });
    
    }

    const submitRegister = e =>{
        e.preventDefault();
        register({ formData });
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
                <form className="form" onSubmit={e => submitRegister(e)}> 
                <h2 className="text-center">To be a part of MyBloggy</h2>
               
               {/* SECTION Input Fields */}
                <div className="row auth-field mt-5 mb-3">
                    <div className="col-6 mb-3">
                        <p>First Name</p>
                        <input onChange={handleChange('firstName')} value={firstName} type="text" className="form-control" placeholder="First name" aria-label="First name"/>
                    </div>

                    <div className="col-6 mb-3">
                        <p>Last Name</p>
                        <input onChange={handleChange('lastName')} value={lastName} type="text" className="form-control" placeholder="Last name" aria-label="Last name"/>
                    </div>

                    <div className="col-6 mb-3">
                        <p>Email</p>
                        <input onChange={handleChange('email')} value={email} name={email} type="email" className="form-control" id="inputEmail4" placeholder="Email"/>
                    </div>
                
                    <div className="col-6 mb-3">
                        <p>Password</p>
                        <input onChange={handleChange('password')} value={password} type="password" className="form-control" placeholder="password"/>
                    </div>

                   
                  
                </div>

                <div className="auth-btn">
                        <button type="submit"  className="btn btn-primary ">SignUp</button>

                </div>
                       
              
            </form>  
            </div>   
    </div>
   
    </div>

    )
}

export default connect(null, { register })(Register);
