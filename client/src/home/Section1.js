import React from 'react';

// SECTION Photo
import picture from '../photo/home/section1.jpg';
import heading from '../photo/home/heading.png'

const Section1 = () => {
    return (
        <section className="container-fluid sec-1">
           <div className="row">
            {/* NOTE Flex 1 */}
           <div className='col-lg-6 col-sm-12 mt-3'>
                <img className="content " src={picture} alt=""/>
            </div>

           {/* NOTE Flex 2 */}
               <div className="col-lg-6 col-sm-12 ">     
                    <div className="text-center">
                        <img className="heading-line " src={heading} alt=""/>
                        <h2 className=" ">About My Blog</h2>   
                        <p>
                        This website was created for everyone who would like to show skills, experiences, and imagination by creating great content. 
                        </p>
                        <img className="heading-line rotateimg180" src={heading} alt=""/>

                    </div>

                    </div>


             
           </div>
            
        </section>
    )
}

export default Section1;
