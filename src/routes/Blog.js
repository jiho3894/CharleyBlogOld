import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import Tweet from 'components/Tweet';
import TweetFactory from "components/TweetFactory";
import styled from "styled-components";

const Body = styled.div`
  position: absolute;
  bottom: 0;
`;

const Box = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fit, 30px);
`;

const Blog = ({ userObj }) => {
  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    dbService.collection("tweet").orderBy("createAt","desc").onSnapshot((snapshot) => {
    const TweetArray = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
      setTweets(TweetArray);
    });
  }, []);
  return(
    <Body>
        <>
          <TweetFactory userObj={userObj}/>
          <Box>
            {tweets.map((tweet) => (
              <Tweet 
              key={tweet.id} 
              tweetObj={tweet} 
              isOwner={tweet.creatorId === userObj.uid}/>
            ))}
          </Box>
      </>
    </Body>
  );
}

export default Blog;