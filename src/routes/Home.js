import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import Tweet from 'components/Tweet';
import TweetFactory from "components/TweetFactory";
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
  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    dbService.collection("tweet").orderBy("createAt","desc").onSnapshot((snapshot) => {
    const TweetArray = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
      setTweets(TweetArray);
    });
  }, []);

  return (
    <Body>
      <TweetFactory userObj={userObj}/>
      <Container>
          {tweets.map((tweet) => (
            <Tweet 
            key={tweet.id} 
            tweetObj={tweet} 
            isOwner={tweet.creatorId === userObj.uid}/>
          ))}
      </Container>
      <Link to="/">돌아가기</Link>
    </Body>
    
  );
};
export default Home;