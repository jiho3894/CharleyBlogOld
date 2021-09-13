import React, { useState, useEffect } from "react";
import AppRouter from "../components/Router";
import { authService } from "fbase";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";

const Body = styled.body`
  width: 100%;
  height: 100vh;
  padding: 0;
  margin: 0;
`;

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          email: user.email,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      email: user.email,
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  
  return (
    <Body>
      <GlobalStyles />
      {init ? (
        <>
          <AppRouter
            refreshUser={refreshUser}
            isLoggedIn={Boolean(userObj)}
            userObj={userObj}
          />
        </>
      ) : (
        "로딩중"
      )}
    </Body>
  );
}

export default App;