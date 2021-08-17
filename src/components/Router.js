import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Navigation from "components/Navigation";
import Profile from 'routes/Profile';
import AccountForm from './AccountForm';

const RouterHandle = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
        <>
          <Route exact path="/" component={Navigation}>
            <Navigation userObj={userObj}/>
          </Route>
          <Route exact path="/Home" component={Home}>
            <Home userObj={userObj}/>
          </Route>
          <Route exact path="/profile" component={Profile}>
            <Profile refreshUser={refreshUser} userObj={userObj}/>
          </Route>
        </>
        ) : (
          <>
            <Route exact path="/" component={Auth}>
              <Auth/>
            </Route>
            <Route exact path="/Account" component={AccountForm}>
              <AccountForm/>
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
}

export default RouterHandle;