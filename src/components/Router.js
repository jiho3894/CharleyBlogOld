import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Navigation from "components/Navigation";
import Profile from 'routes/Profile';
import AccountForm from './AccountForm';
import Game from 'routes/Game';
import RamdomNumber from './game/RamdomNumber';

const RouterHandle = ({ refreshUser, userObj, isLoggedIn }) => {
  return (
    <Router>
      <Navigation userObj={userObj}/>
      <Switch>
        <>
          <Route exact path="/" component={Home}>
            <Home userObj={userObj}/>
          </Route>
          <Route exact path="/Game" component={Game}>
            <Game/>
          </Route>
          <Route exact path="/Game/mouse" component={Game}>
            <RamdomNumber></RamdomNumber>
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