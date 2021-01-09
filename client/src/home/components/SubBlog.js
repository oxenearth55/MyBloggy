import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import {Image} from 'cloudinary-react';


const SubBlog = ({image, title, content,date, type ,id}) => {
    return (

        <div className="col-6 my-3">
            <Image className="image"  cloudName="dsrdvi9rl" publicId={image}  crope="scale" />

            {/* <img src={image} alt=""/> */}
            <div className="date my-3">
              
            <p><Moment format='MMMM DD, YYYY'>{date}</Moment> | {type}</p>
            </div>
            <h3 className="my-3">{title}</h3>
            <div className="d-flex justify-content-center">
                    <div className="col-10">
                        <p>{content}
                        </p>
                        <Link to = {`/blog/${id}`} className="my-2 ">READ MORE <i className="fas fa-arrow-right mx-1"></i></Link>
                            
                    </div>
            </div>          
         </div>
    )
}

export default SubBlog;
