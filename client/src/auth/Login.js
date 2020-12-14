import React from 'react';
// SECTION Photo 
import loginPhoto from '../photo/auth/login.jpg'

const Login = () => {
    return (
        
        
        <div className="container-fluid pl-0">
            <div className="row">
                {/* SECTION Picture */}
                <div className="col-6">
                    <div className="auth-image">
                        <img src={loginPhoto} alt=""/>           
                    </div>  
                </div>
               
                {/* SECTION Login Form */}
                <div className="col-6 mt-5">
                    <h2 className="text-center">Welcome and Let begin</h2>
                   
                   {/* SECTION Input Fields */}
                    <div className="row auth-field mt-5 mb-3">
                      

                        <div className="col-12 mb-3">
                            <p>Email</p>
                            <input type="email" className="form-control" id="inputEmail4" placeholder="Email"/>
                        </div>
                    
                        <div className="col-12 mb-3">
                            <p>Password</p>
                            <input type="text" className="form-control" placeholder="password"/>
                        </div>

                       
                      
                    </div>

                    <div className="auth-btn">
                            <button type="button" className="btn btn-primary ">Login</button>

                        </div>
                           
                  
                </div>     
        </div>
       
        </div>

       
    )
}

export default Login;
