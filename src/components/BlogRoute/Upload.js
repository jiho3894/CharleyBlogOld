import React from "react";
import styled from "styled-components";
import TweetFactory from "components/TweetFactory";

const Body = styled.div`
  position: absolute;
  bottom: 0;
`;

const Upload = ({ userObj }) => {
  return (
    <Body>
      <TweetFactory userObj={userObj} />
    </Body>
  );
};

export default Upload;
