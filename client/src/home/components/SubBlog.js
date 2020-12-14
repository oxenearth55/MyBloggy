import React from 'react';
import Moment from 'react-moment';

const SubBlog = ({image, title, content,date, type ,link}) => {
    return (

        <div className="col-6 my-3">
            <img src={image} alt=""/>
            <div className="date my-3">
              
            <p><Moment format='MMMM DD, YYYY'>{date}</Moment> | {type}</p>
            </div>
            <h3 className="my-3">{title}</h3>
            <div className="d-flex justify-content-center">
                    <div className="col-10">
                        <p>{content}
                        </p>
                        <button className="my-2">READ MORE <i className="fas fa-arrow-right mx-1"></i></button>
                            
                    </div>
            </div>          
         </div>
    )
}

export default SubBlog;
