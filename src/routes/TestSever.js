import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Container = styled.div`
  font-size: 30px;
`;

const Test = () => {
  return (
    <Container>
      <Link to="TestServer/click">Click</Link>
      <hr/>
      <Link to="TestServer/coin">Coins</Link>
    </Container>
  );
};

Test.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Test;
