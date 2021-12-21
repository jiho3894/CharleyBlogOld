import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

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

const StyleChange = ({ style, big }) => {
  return (
    <button
      style={{
        color: style.color,
      }}
    >
      {style.color}
    </button>
  );
};

const SaveChange = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        color: "red",
        background: "blue",
      }}
    >
      {text}
    </button>
  );
};

const Test = ({text}) => {
  const [index, setIndex] = useState("x");
  const OptionSelect = (e) => {
    setIndex(e.target.value);
  };
  const [value, setValue] = useState("hi");
  const change = () => {
    setValue("hid");
  };

  const [counter, setCounter] = useState(0);
  const [showing, setShowing] = useState(false);

  const Hello = () => {
    useEffect(() => {
      console.log("hi");
      return () => onClick();
    }, []);
    return <h1>h2</h1>;
  };
  const onClicks = () => setShowing((prev) => !prev);
  const onChange = (e) => setValue(e.target.value);
  const onClick = () => setCounter((prev) => prev + 1);
  const fuck = () => console.log("counter");
  useEffect(() => {
    fuck();
  }, [counter]);
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
      <StyleChange
        style={{
          color: "red",
          background: "blue",
        }}
        hi="what"
        big={true}
      />
      <SaveChange text={value} onClick={change} />
      <hr/>
      <input placeholder="text" value={value} onChange={onChange} />
      <button onClick={onClick}>{text}</button>
      <h1>{counter}</h1>
      <div>
        {showing ? <Hello /> : null}
        <button onClick={onClicks}>{!showing ? "show" : "hide"}</button>
      </div>
    </Container>
  );
};

Test.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Test;
