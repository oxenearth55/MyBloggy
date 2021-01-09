import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {logout} from '../actions/auth';

const Menu = ({auth:{isAuthenticated}, logout}) => {
   
    return (
        <div className="container-fluid mx-0 px-0">

        <div className="nav-menu">
            <div className="d-flex justify-content-end menu-login ">
             { !isAuthenticated ? (
                 <Fragment>
                    <Link to = '/register' className=" font-champagne mx-4">
                    Signup
                    </Link>
                    <Link to = '/login' className=" font-champagne mx-4">
                        Signin
                    </Link>
                 </Fragment>
            ) : (
                <Link onClick={() => logout()}  className=" font-champagne mx-4">
                    Logout
                </Link>)
                }   
          
            

            </div>
            <div className="col-12 font-rabbit text-center">
                <h1 className='menu-logo'>MyBloggy</h1> 
            </div>
            <div className='row menu-bar justify-content-center'>
                <div className="mx-4">
                <Link to ='/' className=" font-champagne">
                    Home
                </Link>
                </div>
                <div className="mx-4">
                <Link to ='/dashboard' className=" font-champagne">
                    Dashboard
                </Link>
                </div>
                <div className="mx-4">
                <Link to ='/blogs' className=" font-champagne">
                    Blogs
                </Link>
                </div>

             

            </div>
        </div>
        </div>
       
    )
}

const mapStateToProps = state => ({
    auth : state.auth
})


export default connect(mapStateToProps, { logout })(Menu);
