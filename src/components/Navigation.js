import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

const Body = styled.nav`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const UL = styled.ul`
  list-style: none;
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const LI = styled.li`
  float: left;
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Container = styled.div`
  width: 400px;
  height: 250px;
  background-image: url("https://www.pngkey.com/png/full/110-1103031_talking-png-download-face-to-face-talk-png.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  &:hover {
    width: 410px;
    height: 260px;
  }
`;

const Container2 = styled.div`
  width: 400px;
  height: 250px;
  background-image: url("https://img.icons8.com/color/452/edit-user-female.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  &:hover {
    width: 410px;
    height: 260px;
  }
`;

const SLink = styled(Link)`
  width: 100%;
  text-align: center;
`;

const Text = styled.p`
  text-align: center;
  vertical-align: bottom; 
  font-size: 30px;
  font-weight: 600;
`;

const Navigation = ({ userObj }) => {
  return(
  <Body>
    <UL>
      <LI>
        <SLink to="/Home">
          <Container/>
        </SLink>
        <Text>Home</Text>
      </LI>
      <LI>
        <SLink to="/profile">
          <Container2/>
        </SLink>
        <Text>{userObj.displayName}님의 프로필</Text>
      </LI>
    </UL>
  </Body>
)};

export default Navigation;