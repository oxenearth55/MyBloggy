import React, {Fragment} from 'react';
// ANCHOR components 
import Intro from './Intro';
import Section1 from './Section1';
import Section2 from './Section2'; 
import Section3 from './Section3';
import Sidebar from './SideBar';



const Home = () => {
    return (
     <Fragment>
         <Intro/>
         <Section1/>
         
            <Section2/>

         <div className="container-fluid">
             <div className="row">
                 <div className="col-lg-8 col-sm-12">
                 <Section3/>
                 </div>

                 <div className="col-lg-4 col-sm-12">
                 <Sidebar/>
                 </div>
            
          
             </div>
           


         </div>
        

     </Fragment>
      
    )
}



export default  Home;
