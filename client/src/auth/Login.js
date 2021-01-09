import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../actions/auth';
// SECTION Photo 
import loginPhoto from '../photo/auth/login.jpg'

const Login = ({ auth : {isAuthenticated}, login}) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const {email, password} = formData;

    const handleChange = name => e => {
        setFormData({...formData, [name] : e.target.value});
    }

    const submitLogin = e => {
        e.preventDefault();
        login({formData});
    }

    if(isAuthenticated){
       return <Redirect to ='/dashboard'/>

    }

    return (
        
        
        <div className="container-fluid login">
            <div className="row justify-content-center">
                {/* SECTION Picture */}
    
                <div className="col-6">
                    <div className="auth-image">
                        <img src={loginPhoto} alt=""/>           
                    </div>  
                </div>
               
                {/* SECTION Login Form */}
                <div className="col-lg-6 col-sm-12 mt-3">

                    <form onSubmit ={(e) => submitLogin(e) } className="form" >
                        <h2 className="text-center">Welcome and Let begin</h2>
                    
                    {/* SECTION Input Fields */}
                        <div className="row auth-field mt-5 mb-3">
                        
                            <div className="col-12 mb-3">
                                <p>Email</p>
                                <input type="email" onChange={handleChange('email')} className="form-control" id="inputEmail4" placeholder="Email"/>
                            </div>
                        
                            <div className="col-12 mb-3">
                                <p>Password</p>
                                <input type="password" onChange={handleChange('password')} className="form-control" placeholder="password"/>
                            </div>                 
                        
                        </div>

                        <div className="auth-btn">
                                <button type="submit" className="btn btn-primary ">Login</button>

                        </div>
                           
                    </form>
                  
                  
                </div>     
        </div>
       
        </div>

       
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { login }) (Login);
