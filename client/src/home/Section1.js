import React from 'react';

// SECTION Photo
import picture from '../photo/home/section1.jpg';
import heading from '../photo/home/heading.png'

const Section1 = () => {
    return (
        <section className="d-flex justify-content-center  sec-1">
            {/* NOTE Flex 1 */}
           <div>
                <img className="content  m-2" src={picture} alt=""/>
           </div>

           {/* NOTE Flex 2 */}
           <div className="container text-center content m-2 ">

               <div className='col-12'>
                    <img className="heading-line" src={heading} alt=""/>
               </div>

               <div className="d-flex   justify-content-center align-items-center">
               <div className="col-8 ">     
               <h2 className="mb-2">About My Blog</h2>   
                    <p>
                        This website was created for everyone who would like to use their imagination to create
                        a greatfult blog by their own. This is my inspiration to create this website.
                    </p>
                    </div>
               </div>

               <div className='col-12'>
                    <img className="heading-line rotateimg180" src={heading} alt=""/>
               </div>
             
           </div>
            
        </section>
    )
}

export default Section1;
