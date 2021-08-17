import React, { useState } from "react";
import { dbService, storageService } from "fbase";

const Tweet = ({ tweetObj, isOwner }) => {
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
          <>
            <form onSubmit={onSubmit}>
              <input
                type="text"
                placeholder="수정할 텍스트"
                value={newTweet}
                required
                onChange={onChange}
              />
              <input type="submit" value="올리기" />
            </form>
            <button onClick={toggleEditing}>취소</button>
          </>
          )}
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {tweetObj.attachmentUrl && <img alt="" src={tweetObj.attachmentUrl} width="50px" height="50px"/> }
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>삭제하기</button>
              <button onClick={toggleEditing}>수정하기</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;