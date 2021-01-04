import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getBlog } from '../actions/blog';
import Spinner from '../components/Spinner';
import Header from '../components/Header';

const Blog = ({match, blog:{ blog, loading }, getBlog}) => {

    useEffect(() => {
        getBlog(match.params.id);
        console.log('getBlog now working' + match.params.id)
    },[getBlog])
    return (
        <div>
            
            {blog !== null && !loading ? 
                <div>
                    <Header section ={blog.type} text={blog.type}/>
                    <div className="container my-4">
                    <h2 className="text-center">{blog.topic}</h2>
                    <p>{blog.content}</p>

                    </div>


                </div>
                
            
        
        :<Spinner/> }
            
        </div>
    )
}
const mapStateToProps = state => ({
    blog: state.blog
});
export default connect(mapStateToProps, { getBlog })(Blog);
