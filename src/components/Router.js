import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Navigation from "components/Navigation";
import Profile from 'routes/Profile';
import AccountForm from './AccountForm';
import RamdomNumber from './game/RamdomNumber';
import StudyBlog from 'routes/Blog';

const RouterHandle = ({ refreshUser, userObj, isLoggedIn }) => {
  return (
    <Router>
      <Navigation userObj={userObj}/>
      <Switch>
        <>
          <Route exact path="/" component={Home}>
            <Home userObj={userObj}/>
          </Route>
          <Route exact path="/Game">
            <RamdomNumber></RamdomNumber>
          </Route>
          <Route exact path="/StudyBlog">
            <StudyBlog userObj={userObj}/>
          </Route>
          {isLoggedIn ? 
          (
            <Route exact path="/profile" component={Profile}>
              <Profile refreshUser={refreshUser} userObj={userObj}/>
            </Route>
          ) : 
          (
            <Route exact path="/profile" component={Auth}>
              <Auth/>
            </Route>
          )
        }
          <Route exact path="/Account" component={AccountForm}>
            <AccountForm/>
          </Route>
        </>
      </Switch>
    </Router>
  );
}

export default RouterHandle;