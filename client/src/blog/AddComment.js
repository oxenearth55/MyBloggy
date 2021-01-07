import React, {useState} from 'react'
import { connect } from 'react-redux'
import { createComment } from '../actions/blog'

const AddComment = ({createComment, cancleCreate, blog}) => {
    const [formData, setFormData] = useState({
        text: ""
    });

    const handleChange = name => e => {
        setFormData({...formData, [name]: e.target.value});
        // console.log('text is ' + formData.text);
    }

    const onSubmit = e => {
        e.preventDefault(); 
        createComment(formData,blog._id);
        cancleCreate()
    }

    return (
        <form onSubmit={onSubmit} className="form-outline my-3">
            <textarea onChange={handleChange('text')} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            <button className='btn btn-primary' type='submit'>Submit</button>  
            <button onClick={() => cancleCreate()} className='btn btn-danger' >Cancle</button>            
          
        </form>
    )
}

export default connect(null, {createComment}) (AddComment);
