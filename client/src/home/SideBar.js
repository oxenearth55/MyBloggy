import React from 'react';
import {Link} from 'react-router-dom';
import profile from '../photo/home/sidebar/profile.jpg'
import photo from '../photo/home/section3/sec3.jpg'
const SideBar = () => {
    return (
        <div className="sidebar">
            {/* SECTION Profile */}
            <div className="about-me">
                <div className="header">
                    <h3>About Me
                    <div className="line"></div>
                </h3>
                </div>
              
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

            {/* SECTION Social */}
            <div className="social mt-">
                <div className="header"> 
                    <h3>SUBSCRIBE & FOLLOW
                        <div className="line"></div>
                    </h3>
                </div>
               
                <div className="social-icon d-flex justify-content-start my-3">
                    <div className="icon mr-3 facebook">
                        <a href="https://www.facebook.com/earthlono.new.1/">
                            <i class="fab fa-4x fa-facebook-square"></i>
                        </a> 
                       
                    </div>

                    <div className="icon mr-3 linkedin">
                        <a href="https://www.linkedin.com/in/tanawat-limsakul-981283176/" >
                            <i class="fab fa-4x fa-linkedin"></i>     
                        </a>                  
                    </div>

                    <div className="icon mr-3 instagram">
                        <a href="https://www.instagram.com/earthlono/">
                            <i class="fab  fa-4x fa-instagram-square"></i>
                        </a>                   
                    </div>

                    <div className="icon mr-3 line">
                        <a href="">
                            <i class="fab fa-4x fa-line"></i>
                        </a>             
                    </div>


                </div>
            </div>
          {/* SECTION  Popular blog */}
          <div className="popular-blog mt-">
            <div className="header"> 
                <h3>Popular Blogs
                    <div className="line"></div>
                 </h3>
            </div>

            <div className="row my-4">
                <div className="col-6 ">
                    <img src={photo} alt=""/> 
                </div>
                <div className="col-6 p-0">
                    <div className="date">
                        <p>December 14, 2020 | Technology</p>
                    </div>
                    <h2 className="my-2">What is MERN Stack</h2>

                </div>
            </div>

               
            <div className="lineend"></div>


          </div>
            
            
        </div>
    )
}

export default SideBar;
