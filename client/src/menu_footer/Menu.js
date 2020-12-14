import React from 'react';
import {Link} from 'react-router-dom';

const Menu = props => {
   
    return (
        <div className="nav-menu">
            <div className="d-flex justify-content-end menu-login ">
            <Link to = '/register' className=" font-champagne mx-4">
                    Signup
                </Link>

                <Link to = '/login' className=" font-champagne mx-4">
                    Signin
                </Link>
            

            </div>
            <div className="col-12 font-rabbit text-center">
                <h1 className='menu-logo'>MyBloggy</h1> 
            </div>
            <div className='menu-bar justify-content-between d-flex'>
                <Link to ='/' className=" font-champagne">
                    Home
                </Link>

                <Link to ='/' className=" font-champagne">
                    Dashboard
                </Link>

                <Link to ='/' className=" font-champagne">
                    Blogs
                </Link>

             

            </div>
        </div>
       
    )
}


export default Menu;
