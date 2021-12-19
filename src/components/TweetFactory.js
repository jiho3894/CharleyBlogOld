import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const Chat = styled.input`
  width: 200px;
`;

const File = styled.input`
  width: 100px;
`;

const TweetFactory = ({ userObj }) => {
  const [tweet, setTweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const history = useHistory();
  const onSubmit = async (event) => {
    history.push("/studyBlog");
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const tweetObj = {
      text: tweet,
      createAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("tweet").add(tweetObj);
    setTweet("");
    setAttachment("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    if (theFile) {
      reader.onloadend = (finishedEvent) => {
        const {
          currentTarget: { result },
        } = finishedEvent;
        setAttachment(result);
      };
      reader.readAsDataURL(theFile);
    }
  };

  const onClearPhotoClick = () => setAttachment("");

  return (
    <form onSubmit={onSubmit}>
      <Chat
        value={tweet}
        onChange={onChange}
        type="text"
        placeholder="채팅 입력"
        maxLength={100}
        required
      />
      <File type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="올리기" />
      {attachment && (
        <div>
          <img alt="" src={attachment} width="50px" height="50px" />
          <button onClick={onClearPhotoClick}>Clear</button>
        </div>
      )}
    </form>
  );
};
export default TweetFactory;
