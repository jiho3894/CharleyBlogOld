import React, { useState } from "react";
import { dbService, storageService } from "fbase";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    if (ok) {
      await dbService.doc(`nweet/${nweetObj.id}`).delete();
      if(nweetObj.attachmentUrl !== ""){
        await storageService.refFromURL(nweetObj.attachmentUrl).delete();
      }
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`nweet/${nweetObj.id}`).update({
      text: newNweet,
    });
    setEditing(false);
  };

  const onChange = (event) => {
    const {target: { value } } = event;
    setNewNweet(value);
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
                placeholder="Edit your nweet"
                value={newNweet}
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
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && <img alt="" src={nweetObj.attachmentUrl} width="50px" height="50px"/> }
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

export default Nweet;