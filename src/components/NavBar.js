import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login  from '../pages/login.page';
import Register from '../pages/register.page';
//import '../Styles/ItemView.css';
import ShoppingBag from './ShoppingBag';
import ListView from '../pages/book.list.page';

const Hide = () =>{         // hides login and register buttons
  //console.log(Logged);
  //console.log(Logged.test);
  //Logged.test=true;
  const te=true;
  console.log(te);

  //console.log(Login.login, "login");



  if(te===true)
  {
    return (
      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/sign-in">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/sign-up">
              Sign up
            </Link>
          </li>
        </ul>
      </div>
    )
  }
return null;

};

const NavBar = () => {

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to="/sign-in">
              BookShop
            </Link>
            <Link className="navbar-brand" to="/list-view">
              Book List
            </Link>
            <Link className="navbar-brand" to="/shopping-bag">
              Shopping Bag
            </Link>


            {/* <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/sign-in">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sign-up">
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>*/}
            <Hide />
          </div>
        </nav>



        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/sign-in" component={Login} />
              <Route path="/sign-up" component={Register} />
              <Route path="/list-view" component={ListView} />
              <Route path="/shopping-bag" component={ShoppingBag} />

            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
};
export default NavBar;
