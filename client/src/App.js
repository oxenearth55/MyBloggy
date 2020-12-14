import React, { useEffect, Fragment} from 'react';
import {BrowserRouter, BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import setAuthToken from './utils/setAuthToken';


//SECTION Redux 
import {Provider} from 'react-redux';
import Store from './Store';


//ANCHOR Main Components
import Home from './home/Home';
import Login from './auth/Login';
import Register from './auth/Register';
//ANCHOR Sub Components 
import Menu from './menu_footer/Menu';

import './App.css';

//NOTE check localStorage that there is any token there?
if(localStorage.token){
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect( () => {

  },[]);

  return(
    <Provider store = {Store}>

    <BrowserRouter>
      <Router>
        <Fragment>
          <Menu/>
          <div className="container-fluid mx-0 px-0">
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route exact path='/login' component={Login}/>
              <Route exact path="/Register" component={Register}/>
            </Switch>        
          </div>    
        </Fragment>
      </Router>
    </BrowserRouter>
    </Provider>
    
   
  )

}

export default App;