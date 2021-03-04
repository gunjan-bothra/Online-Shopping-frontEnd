import React, { Component } from 'react';
// import Button from '@material-ui/core/Button';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import  Login  from './components/Login';
import  SignUp  from './components/Signup';
import Main from './pages/Main';
import RestaurantDetail from './components/RestaurantDetail';
import {useRoutes, useRedirect} from 'hookrouter';

const routes = {
  '/': () => <SignUp />,
  '/signup': () => <SignUp />,
  '/login': () => <Login />,
  '/app': () => <Main />,
  '/restaurantDetail/:restaurantName': ({restaurantName}) => <RestaurantDetail name={restaurantName}/>
};

const App = () => {
    const routeResult = useRoutes(routes);
    return (
      // <Router>
      <div className="App">
         <Home />
         {routeResult}
      </div>
      // </Router>
    )
}
// class App extends Component {
//   render() {
//     return (
//       <Router>
//         <div className="App">
//         <Home />
//         <Switch>
//           <Route path='/login' exact component={Login} />
//           <Route path='/signup' exact component={SignUp} />
//         </Switch>
//         </div>
//       </Router>
//     );
//   }
// }

export default App;
