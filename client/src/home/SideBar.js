import React, {Fragment} from 'react';
import profile from '../photo/home/sidebar/profile.jpg';
import photo from '../photo/home/section3/sec3.jpg';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../components/Spinner';
import {Image} from 'cloudinary-react';
import Moment from 'react-moment';

const SideBar = ({blog:{blogs, loading}}) => {


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

        {loading ? <Spinner/> : 
            <Fragment>
                {blogs.sort((a,b) => (b.likes.length > a.likes.length) ? 1 : ((a.likes.length > b.likes.length ) ? -1 : 0)).slice(0,4).map(blog => 
                    <div className="row popular my-4">
                    <div className="col-6 ">
                    <Image className="image"  cloudName="dsrdvi9rl" publicId={blog.image} width="300"  crope="scale" />
                    </div>
                    <div className="col-6 p-0">
                        <div className="date">
                        <p><Moment format='MMMM DD, YYYY'>{blog.date}</Moment> | {blog.type}</p>
                        </div>
                        <h2 className="my-2">{blog.topic}</h2>
                        <Link to = {`/blog/${blog._id}`} className="my-2 link-popular"><p>READ MORE </p><i className="fas fa-arrow-right mx-1"></i></Link>


                    </div>
                    <div className="lineend mt-3"></div> 
                </div>
                )}
            </Fragment>

               
           }
           
          </div>
        </div>
    )
}

const mapStateToprops = state => ({
    blog: state.blog
})

export default connect (mapStateToprops,{})(SideBar);
