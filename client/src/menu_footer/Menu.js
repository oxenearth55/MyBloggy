import React from 'react';
import {Link} from 'react-router-dom';

const Menu = props => {
    const boostrapMenu = () => (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to = '/' className="navbar-brand font-rabbit" >MyBloggy</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
            <li className="nav-item active">
            <Link to ='/' className="nav-link" >Home <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item">
            <Link to ='/' className="nav-link" >Dashboard</Link>
            </li>
            <li className="nav-item">
            <Link to ='/'  className="nav-link" >Blogs</Link>
            </li>
            <li className="nav-item">
            <Link to ='/'  className="nav-link " >Signup</Link>
            </li>
            <li className="nav-item">
            <Link to ='/'  className="nav-link " >Signin</Link>
            </li>
        </ul>
        </div>
  </nav>

    )
    return (
        <div className="nav-menu">
            <div className="d-flex justify-content-end menu-login ">
            <Link to ='/' className=" font-champagne mx-4">
                    Signup
                </Link>

                <Link to ='/' className=" font-champagne mx-4">
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
