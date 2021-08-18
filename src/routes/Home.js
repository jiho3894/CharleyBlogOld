import React, { useState, useEffect, useCallback } from "react";
import { dbService } from "fbase";
import Tweet from 'components/Tweet';
import TweetFactory from "components/TweetFactory";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button, ButtonToolbar } from 'react-bootstrap';

const Under = styled.div`
  position: absolute;
  bottom: 0;
`;

const ChatBox = styled.body`
  width: 500px;
  height: 500px;
`;

const Chatting = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column-reverse;
  align-items: center;
  width: 400px;
  height: 400px;
  bottom: 50px;
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fit, 30px);
`;

const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);
  const toggle = useCallback(() => setState(state => !state), []);
  return [state, toggle];
}

const Home = ({ userObj }) => {
  const [tweets, setTweets] = useState([]);
  const [isOn, toggleIsOn] = useToggle();
  useEffect(() => {
    dbService.collection("tweet").orderBy("createAt","desc").onSnapshot((snapshot) => {
    const TweetArray = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
      setTweets(TweetArray);
    });
  }, []);

  return (
    <>
      <Link to="/">돌아가기</Link>
      <Under>
        <ChatBox>
          { isOn ? (
            <Chatting>
              <TweetFactory userObj={userObj}/>
              <Container>
                  {tweets.map((tweet) => (
                    <Tweet 
                    key={tweet.id} 
                    tweetObj={tweet} 
                    isOwner={tweet.creatorId === userObj.uid}/>
                  ))}
              </Container>
            </Chatting>
            ) : null
          }
        </ChatBox>
        <ButtonToolbar>
            <Button variant="primary" onClick={toggleIsOn} size="sm" >Chatting</Button>
        </ButtonToolbar>
      </Under>
    </>
  );
};
export default Home;