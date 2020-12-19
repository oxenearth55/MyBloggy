import React from 'react';
import login from '../photo/auth/login.jpg';
const Header = ({section, text}) => {
    return (
        <div className="header-img">
            <div className= {`header-image-${section} d-flex justify-content-center align-items-center`}>
                <h1 className='px-5 py-3'>{text}</h1>
            </div>
        </div>

    )
}

export default Header;
