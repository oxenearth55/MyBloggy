import React from 'react';

const Card = ({image, title, content}) => {
    return (
        <div className="card mx-3 my-5 ">
            <img src={image} alt=""/>
            <div className="mt-4">
                <h3>{title}</h3>
                <p>{content}</p>
            </div>
        </div>
    )
}

export default Card;
