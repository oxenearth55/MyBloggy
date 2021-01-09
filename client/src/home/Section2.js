import React from 'react';
// SECTION Components 
import Card from './components/Card';
// SECTION Photo 
import tech from '../photo/home/section2/tech.jpg';
import food from '../photo/home/section2/food.jpg';
import travel from '../photo/home/section2/travel.jpg';


const Section2 = () => {
    return (
        <div className="sec-2 my-4">
            <div className="container-fluid ">
            <div className="d-flex justify-content-center topic ">
                <h2 className=" text-center p-3">Blog Category</h2>
            </div>
            <div className="row justify-content-center ">
           
            <Card image={tech} title={'Technology'} content={'There are a ton of things that you can explore about technologies.'}/>
            <Card image={food} title={'Food'} content={'There are a ton of things that you can explore about foods.'}/>
            <Card image={travel} title={'Travel'} content={'There are a ton of things that you can explore about travels.'}/>
            </div>
          
            </div>
           
        </div>
    )
}

export default Section2;
