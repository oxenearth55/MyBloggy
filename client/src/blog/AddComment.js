import React, {useState} from 'react'
import { connect } from 'react-redux'
import { createComment } from '../actions/blog'

const AddComment = ({createComment, cancleCreate,  blog:{blog}}) => {
    const [formData, setFormData] = useState({
        text: ""
    });

    const handleChange = name => e => {
        setFormData({...formData, [name]: e.target.value});
    }

    const onSubmit = async e => {
        e.preventDefault(); 
        createComment(formData,blog._id);
        cancleCreate()  
    }

    return (
        <form onSubmit={onSubmit} className="form-outline my-3">
            <h3 className="text-center">Add Comment</h3>
            <textarea onChange={handleChange('text')} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            <button className='btn btn-primary' type='submit'>Submit</button>  
            <button onClick={() => cancleCreate()} className='btn btn-danger' >Cancle</button>            
          
        </form>
    )
}

const mapStateToProps = state => ({
    blog: state.blog
})

export default connect(mapStateToProps, {createComment}) (AddComment);
