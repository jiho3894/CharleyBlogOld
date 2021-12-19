import React from "react";
import styled from "styled-components";
import Board from './Board';
import { useState } from "react";
import Timer from "./Timer";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Body = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 800px;
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

let array = [];
for(let i = 1; i<=25; i++) {
  array.push(i);
}

const RamdomNumber = () => {
  const [numbers, setNumbers] = useState(array);
  const [gameFlag, setGameFlag] = useState(false);
  const [current, setCurrent] = useState(1);

  const handleClick = (num) => {
  if(num === current) {
    if(num === 50) {
      alert("축하합니다");
      endGame();
    }
    const index = numbers.indexOf(num);
    setNumbers(numbers => [
      ...numbers.slice(0, index),
      num < 26 ? num + 25 : 0,
      ...numbers.slice(index + 1)
    ]);
    setCurrent(current => current + 1);
    }
  }

  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const gameStart = () => {
    setNumbers(shuffleArray(array));
    setCurrent(1);
    setGameFlag(true);
  }

  const endGame = () => {
    setGameFlag(false);
  }

  return (
    <Body>
      <h1>랜덤숫자 맞추기 게임</h1>
      <Container>
        {gameFlag ? (
          <>
            <Board numbers={numbers} handleClick={handleClick}/>
            <Timer/>
            <Button variant="primary" size="lg" onClick={endGame}>그만하기</Button>
          </>
        ) : (
          <>
            <Link to="/Game">돌아가기</Link>
            <Button variant="primary" size="lg" onClick={gameStart}>Start</Button>
          </>
        )}
      </Container>
    </Body>
  )
}

export default RamdomNumber;