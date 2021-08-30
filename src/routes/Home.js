import React, { useState, useEffect, useCallback } from "react";
import { dbService } from "fbase";
import Tweet from 'components/Tweet';
import TweetFactory from "components/TweetFactory";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button, ButtonToolbar } from 'react-bootstrap';

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

const Under = styled.div`
  position: absolute;
  bottom: 0;
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

const Box = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fit, 30px);
`;

const Text = styled.p`
  font-size: 30px;
  font-weight: 600;
`;

const Text2 = styled.p`
  margin-top: 100px;
  font-size: 30px;
  font-weight: 600;
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
    <Body>
      <Link to="/">돌아가기</Link>
      <Container>
        <Select>
          <Link to="/Game">
            <img width="400px" height="400px" src={process.env.PUBLIC_URL + '/images/img1.png'} alt=""/>
          </Link>
          <Text>Mouse Game</Text>
        </Select>
        <Select>
          <a href="https://jiho3894.github.io/cloneNetflix/">
            <img width="400px" height="400px" src={process.env.PUBLIC_URL + '/images/img2.png'} alt=""/>
          </a>
          <Text>Netflix</Text>
        </Select>
        <Select>
          <a href="https://jiho3894.github.io/Web-Synthesizer/piano/">
            <img width="400px" height="400px" src={process.env.PUBLIC_URL + '/images/img3.png'} alt=""/>
          </a>
          <Text>Web-Synthesizer</Text>
        </Select>
        <Select>
          <img width="400px" height="300px" src={process.env.PUBLIC_URL + '/images/img4.png'} alt=""/>
          <Text2>Study Blog</Text2>
        </Select>
      </Container>
      <Under>
        <>
          { isOn ? (
            <Chatting>
              <TweetFactory userObj={userObj}/>
              <Box>
                  {tweets.map((tweet) => (
                    <Tweet 
                    key={tweet.id} 
                    tweetObj={tweet} 
                    isOwner={tweet.creatorId === userObj.uid}/>
                  ))}
              </Box>
            </Chatting>
            ) : null
          }
        </>
        <ButtonToolbar>
            <Button variant="primary" onClick={toggleIsOn} size="sm" >Chatting</Button>
        </ButtonToolbar>
      </Under>
    </Body>
  );
};
export default Home;