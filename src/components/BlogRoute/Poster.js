import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import styled from "styled-components";
import { Button, ButtonToolbar } from 'react-bootstrap';

const Body = styled.div`
  display: flex;
`;

const Poster = ({ tweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    if (ok) {
      await dbService.doc(`tweet/${tweetObj.id}`).delete();
      if(tweetObj.attachmentUrl !== ""){
        await storageService.refFromURL(tweetObj.attachmentUrl).delete();
      }
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`tweet/${tweetObj.id}`).update({
      text: newTweet,
    });
    setEditing(false);
  };

  const onChange = (event) => {
    const {target: { value } } = event;
    setNewTweet(value);
  };
  
  return (
    <div>
      {editing ? (
        <>
          {isOwner && (
          <Body>
            <form onSubmit={onSubmit}>
              <input
                type="text"
                placeholder="수정할 텍스트"
                value={newTweet}
                required
                onChange={onChange}
              />
              <input type="submit" value="⭕" />
            </form>
            <button onClick={toggleEditing}>취소</button>
          </Body>
          )}
        </>
      ) : (
          <Body>
            <h4>{tweetObj.text}</h4>
            {tweetObj.attachmentUrl && <img alt="" src={tweetObj.attachmentUrl} width="50px" height="50px"/> }
            {isOwner && (
              <>
                <ButtonToolbar>
                  <Button onClick={onDeleteClick} variant="danger" size="sm">삭제하기</Button>
                  <Button onClick={toggleEditing} variant="info" size="sm">수정하기</Button>
                </ButtonToolbar>
              </>
            )}
          </Body>
      )}
    </div>
  );
};

export default Poster;