import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { editComment } from '../actions/blog'

const EditComment = ({editComment, cancleEdit, comment, blog:{blog}}) => {
    const [formData, setFormData] = useState({
        text: ''
    });

    const { text } = formData;
    useEffect(() => {
        setFormData({...formData, text: comment.text});
        
    },[])

    const handleChange = name => e => {
        setFormData({...formData, [name]: e.target.value});
        
    }

    const onSubmit = async e => {
        e.preventDefault(); 
        editComment(formData,blog._id,comment._id, blog.comments);
        cancleEdit()  
    }

    return (
        <form onSubmit={onSubmit} className="form-outline my-3">
            <h3 className="text-center">Edit Comment</h3>
            <textarea value={text} onChange={handleChange('text')} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            <button className='btn btn-primary' type='submit'>Edit</button>  
            <button onClick={() => cancleEdit()} className='btn btn-danger' >Cancle</button>            
          
        </form>
    )
}

const mapStateToProps = state => ({
    blog: state.blog
})

export default connect(mapStateToProps, {editComment}) (EditComment);
