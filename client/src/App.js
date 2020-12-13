import React, { useEffect, Fragment} from 'react';
import {BrowserRouter, BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 

//ANCHOR Main Components
import Home from './home/Home';
//ANCHOR Sub Components 
import Menu from './menu_footer/Menu';

import './App.css';

const App = () => {
  return(
    <BrowserRouter>
      <Router>
        <Fragment>
          <Menu/>
          <div className="container-fluid mx-0 px-0">
            <Switch>
              <Route exact path='/' component={Home}/>
            </Switch>
          
          </div>
      
        </Fragment>
      </Router>
    </BrowserRouter>
    
   
  )

}

export default App;
