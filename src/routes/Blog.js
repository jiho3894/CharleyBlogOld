import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import Tweet from 'components/Tweet';
import styled from "styled-components";
import { Link } from "react-router-dom";

const Body = styled.div`
  position: absolute;
`;

const Box = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fit, 100px);
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
      <Link to="StudyBlog/Upload">
        올리기
      </Link>
      <>
        <Box>
          {tweets.map((tweet) => (
            <Link to={`/StudyBlog/${tweet.id}`}>
              <Tweet 
              key={tweet.id} 
              tweetObj={tweet} 
              isOwner={tweet.creatorId === userObj.uid}/>
            </Link>
          ))}
        </Box>
      </>
    </Body>
  );
}

export default Blog;