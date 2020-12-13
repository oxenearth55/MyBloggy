import React from 'react';
import profile from '../photo/home/sidebar/profile.jpg'

const SideBar = () => {
    return (
        <div className="sidebar">
            <h3>About Me
            <div className="line"></div>
            </h3>
            <div className="profile-img text-center">
                <img src={profile} alt=""/>
            </div>
            <div className="text-center my-3">
                <h4>Tanawat Limsakul</h4>
                <div className="d-flex justify-content-center">
                    <div className="col-8 ">
                        <p>I'm Full-Stack developers who can use MERN stack to develop web application </p>
                    </div>
                </div>
               

            </div>
            
            
        </div>
    )
}

export default SideBar;
