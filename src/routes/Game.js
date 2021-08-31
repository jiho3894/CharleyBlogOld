import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Body = styled.body`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  `;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: repeat(2,1fr);
  grid-template-columns: repeat(2,1fr);
`;

const Select = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const App = () =>{
  return (
    <Body>
      <Container>
        <Select>
          <Link to="/Game/mouse">랜덤 숫자 맞추기</Link>
        </Select>
        <Select>
          <Link>?</Link>
        </Select>
        <Select>
          <Link>?</Link>
        </Select>
        <Select>
          <Link>?</Link>
        </Select>
      </Container>
    </Body>
  );
}

export default App;
