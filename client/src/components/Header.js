import React from 'react';
import login from '../photo/auth/login.jpg';
const Header = ({image}) => {
    return (
        
        <div className="auth-image">
            <img src={image} alt=""/>           
        </div>

    )
}

export default Header;
