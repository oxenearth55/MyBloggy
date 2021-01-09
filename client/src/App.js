import React, { useEffect, Fragment} from 'react';
import {BrowserRouter, BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import setAuthToken from './utils/setAuthToken';


//SECTION Redux 
import {Provider} from 'react-redux';
import Store from './Store';
import { loadUser } from './actions/auth';


//ANCHOR Main Components
import Home from './home/Home';
import Login from './auth/Login';
import Register from './auth/Register';
import Dashboard from './dashboard/Dashboard';
import Blogs from './blog/Blogs';
import Blog from './blog/Blog';
//ANCOHR Route 
import PrivateRoute from './PrivateRoute';

//ANCHOR Sub Components 
import Menu from './menu_footer/Menu';
import Alert from './components/Alert';

import './App.css';
import './Responsive.css';

//NOTE check localStorage that there is any token there?
if(localStorage.token){
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect( () => {
    Store.dispatch(loadUser());
  },[]);

  return(
    <Provider store = {Store}>

    <BrowserRouter>
      <Router>
        <div className="layout">
          <Menu/>
          <Alert/>
          <div className="container-fluid mx-0 px-0">
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route exact path='/login' component={Login}/>
              <Route exact path="/Register" component={Register}/>
              <Route exact path='/blogs' component={Blogs}/>
              <Route exact path='/blog/:id' component={Blog}/>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              
            </Switch>        
          </div>    
        </div>
      </Router>
    </BrowserRouter>
    </Provider>
    
   
  )

}

export default App;
