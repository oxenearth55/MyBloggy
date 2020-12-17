import React from 'react';
import login from '../photo/auth/login.jpg';
const Header = ({image}) => {
    return (
        
        <div className="header-image">
            <img src={image} alt=""/>           
        </div>

    )
}

export default Header;
