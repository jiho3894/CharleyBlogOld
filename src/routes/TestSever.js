import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  font-size: 30px;
`;

const Count = () => {
  const [counter, setCounter] = useState(0);
  const onPlus = () => {
    setCounter((current) => current + 1);
  };
  const onMis = () => {
    setCounter((current) => current - 1);
  };
  return (
    <>
      <span>setCounter</span>
      <div>
        <div>{counter}</div>
        <button onClick={onPlus}>++</button>
        <button onClick={onMis}>--</button>
      </div>
    </>
  );
};

const KmConvert = () => {
  const [amount, setAmount] = useState();
  const [fliped, setFliped] = useState(false);
  const onChange = (e) => {
    setAmount(e.target.value);
  };
  const reset = () => setAmount("");
  const onFlip = () => {
    reset();
    setFliped((current) => !current);
  };
  return (
    <div>
      <label htmlFor="km">Km</label>
      <br />
      <input
        disabled={fliped}
        type="number"
        id="km"
        value={fliped === false ? amount : amount / 1000}
        onChange={onChange}
      />
      <br />
      <label htmlFor="mi">M</label>
      <br />
      <input
        disabled={!fliped}
        type="number"
        id="mi"
        value={fliped === true ? amount : amount * 1000}
        onChange={onChange}
      />
      <button onClick={reset}>reset</button>
      <button onClick={onFlip}>Flip</button>
    </div>
  );
};

const MileConvert = () => {
  const [amount, setAmount] = useState();
  const [fliped, setFliped] = useState(false);
  const onChange = (e) => {
    setAmount(e.target.value);
  };
  const reset = () => setAmount("");
  const onFlip = () => {
    reset();
    setFliped((current) => !current);
  };
  return (
    <div>
      <label htmlFor="sec">Minutes</label>
      <br />
      <input
        disabled={fliped}
        type="number"
        id="sec"
        value={fliped === false ? amount : Math.round(amount * 60)}
        onChange={onChange}
      />
      <br />
      <label htmlFor="hour">Hour</label>
      <br />
      <input
        disabled={!fliped}
        type="number"
        id="hour"
        value={fliped === true ? amount : Math.round(amount / 60)}
        onChange={onChange}
      />
      <button onClick={reset}>reset</button>
      <button onClick={onFlip}>Flip</button>
    </div>
  );
};

const Blog = () => {
  const [index, setIndex] = useState("x");
  const OptionSelect = (e) => {
    setIndex(e.target.value);
  };
  return (
    <Container>
      <Count />
      <hr />
      <select value={index} onChange={OptionSelect}>
        <option disabled value="x">
          Select Convert
        </option>
        <option value="0">KM & M</option>
        <option value="1">Minutes & Hour</option>
      </select>
      {index === "0" ? <KmConvert /> : null}
      {index === "1" ? <MileConvert /> : null}
      <hr />
    </Container>
  );
};

export default Blog;
