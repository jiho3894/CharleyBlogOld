import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Navigation = () => {
  return (
    <Header>
      <Link to="/">
        <img
          width="50px"
          height="50px"
          src={process.env.PUBLIC_URL + "/images/home.gif"}
          alt=""
        />
      </Link>
      <Link to="/profile">
        <img
          width="50px"
          height="50px"
          src={process.env.PUBLIC_URL + "/images/profile.png"}
          alt=""
        />
      </Link>
    </Header>
  );
};

export default Navigation;
