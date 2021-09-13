import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Poster from 'components/BlogRoute/Poster';

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
  console.log(tweets);
  return(
    <Body>
      <Link to="/StudyBlog/Upload">
        올리기
      </Link>
      <>
        <Box>
          {tweets.map((tweet) => (
            <>
              <Poster
                key={tweet.id} 
                tweetObj={tweet} 
                isOwner={tweet.creatorId === userObj.uid}/>
              <Link to={`/StudyBlog/Detail/${tweet.id}`}>자세히</Link>
            </>
          ))}
        </Box>
      </>
    </Body>
  );
}

export default Blog;