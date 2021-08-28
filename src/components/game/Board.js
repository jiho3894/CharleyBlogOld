import React from "react";
import styled from "styled-components";
import Box from './Box';

const Container = styled.div`
  width: 700px;
  height: 700px;
  border: 1px solid blue;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  margin-bottom: 15px;
`;

const Board = ({numbers, handleClick}) => {
  return(
    <Container>
      {numbers.map((num, index) => (
        <Box handleClick={handleClick} num={num} key={index}></Box>
      ))}
    </Container>
  )
}

export default Board;