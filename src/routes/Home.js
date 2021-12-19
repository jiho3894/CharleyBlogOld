import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Body = styled.body`
  width: 100%;
  height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
`;

const Select = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.p`
  font-size: 30px;
  font-weight: 600;
`;

const Text2 = styled.p`
  margin-top: 100px;
  font-size: 30px;
  font-weight: 600;
`;

const Home = () => {
  return (
    <Body>
      <Container>
        <Select>
          <Link to="/game">
            <img
              width="350px"
              height="350px"
              src={process.env.PUBLIC_URL + "/images/img1.png"}
              alt=""
            />
          </Link>
          <Text>Mini Game</Text>
        </Select>
        <Select>
          <a href="https://jiho3894.github.io/cloneMovie/#/">
            <img
              width="350px"
              height="350px"
              src={process.env.PUBLIC_URL + "/images/img2.png"}
              alt=""
            />
          </a>
          <Text>Netflix</Text>
        </Select>
        <Select>
          <a href="https://jiho3894.github.io/Web-Synthesizer/piano/">
            <img
              width="350px"
              height="350px"
              src={process.env.PUBLIC_URL + "/images/img3.png"}
              alt=""
            />
          </a>
          <Text>Web-Synthesizer</Text>
        </Select>
        <Select>
          <Link to="/TestServer">
            <img
              width="350px"
              height="250px"
              src={process.env.PUBLIC_URL + "/images/img4.png"}
              alt=""
            />
          </Link>
          <Text2>React Test Sever</Text2>
        </Select>
      </Container>
    </Body>
  );
};
export default Home;
