import React from "react";
import styled from "styled-components";

const Box = ({num, handleClick}) =>{
  return <Container onClick={() => handleClick(num)}>{num !==0 ? num : null}</Container>;
}

const Container = styled.div`
  border: 1px solid rgba(0,0,0,0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 10px rgba(0,0,0,0.8) inset, 0px 0px 5px rgba(200,200,200,0.5);
  }
`;

export default Box;