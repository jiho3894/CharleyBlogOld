import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import Nweet from 'components/Nweet';
import NweetFactory from "components/NweetFactory";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Body = styled.body`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const Container = styled.div`
  display: grid;
  width: 100%;
  height: 100vh;
  grid-template-rows: repeat(auto-fit, 100px);
  gap:10px;
`;

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);
  useEffect(() => {
    dbService.collection("nweet").orderBy("createAt","desc").onSnapshot((snapshot) => {
    const nweetArray = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
      setNweets(nweetArray);
    });
  }, []);

  return (
    <Body>
      <NweetFactory userObj={userObj}/>
      <Container>
          {nweets.map((nweet) => (
            <Nweet 
            key={nweet.id} 
            nweetObj={nweet} 
            isOwner={nweet.creatorId === userObj.uid}/>
          ))}
      </Container>
      <Link to="/">돌아가기</Link>
    </Body>
    
  );
};
export default Home;