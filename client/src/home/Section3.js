import React, {Fragment, useEffect} from 'react';
import photo from '../photo/home/section3/sec3.jpg';
import SubBlog from './components/SubBlog';
import { connect } from 'react-redux';
import { getBlogs } from '../actions/blog';
import Spinner from '../components/Spinner';

const Section3 = ({getBlogs, blog: {blogs, loading}  }) => {
    useEffect(() => {
        getBlogs();
    },[getBlogs])

    return (
        <div className="sec-3 mb-5 ">
            <div className="main-blog text-center">
                <img src={photo} alt=""/>
                <div className="date my-3">
                    <p>December 14, 2020 | Technology</p>
                </div>
                <h2 className="my-3">What is MERN Stack</h2>
                <div className="d-flex justify-content-center">
                    <div className="col-10">
                        <p>Borem ipsum dolor sit amet, adhuc iriure dissentias est in, est ne diam graece tincidunt. 
                        Sit et liber minimuam tsea no doctus fastidii.An molestiae definiebas mel.
                        Quo everti vituperata et, quo cu omnis maiorum aetaea fierentlaboramus eum.Nam at dicant deterruisset.
                        </p>
                        <button className="my-2">READ MORE <i className="fas fa-arrow-right mx-1"></i></button>
                            
                    </div>
            </div>          
            </div>
             
             <div className="sub-blog mt-1">
                 {loading ?  <Spinner/> : 
                 <div className="row text-center">
                    {blogs.slice(0,4).map(blog => 
                    <SubBlog id={blog._id} image={blog.image} title={blog.title} content={blog.topic} date={blog.date} type={blog.type} /> )
                    
                }                   
                 </div>
                }
                 
             </div>
             

        </div>
       
    )
}

const mapStateToProps = state => ({
    blog: state.blog
})

export default connect(mapStateToProps, {getBlogs}) (Section3);
