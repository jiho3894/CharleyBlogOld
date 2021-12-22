import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";

const Coin = () => {
  const [loading, setLoding] = useState(true);
  const [coins, setCoins] = useState([]);
  const [price, setPrice] = useState(0);
  const [value, setValue] = useState(0);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoding(false);
      });
  }, []);
  const onChange = (e) => {
    setPrice(e.target.value);
  };
  const coinChange = (e) => {
    setValue(e.target.value);
  };
  console.log(coins);
  return (
    <div>
      <h1>Coins {loading ? "" : `${coins.length}`}</h1>
      {loading ? (
        <strong>Loding...</strong>
      ) : (
        <>
          <select onChange={coinChange}>
            <option>select coins</option>
            {coins.map((coin, index) => (
              <option key={index} value={coin.quotes.USD.price}>
                {coin.id}
              </option>
            ))}
          </select>
          <input type="number" onChange={onChange} placeholder="price check" />
          {value === 0 || price === 0 ? (
            ""
          ) : (
            <h1>{Math.round((price / value) * 100) / 100}</h1>
          )}
        </>
      )}
    </div>
  );
};

export default Coin;
