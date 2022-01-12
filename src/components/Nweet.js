import { dbService, storageService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "@firebase/storage";
import react from "react";
import { useState } from "react/cjs/react.development";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import userEvent from "@testing-library/user-event";

const Nweet1 = ({ nweetObj, isOwner }) => {
  const [editng, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    const NweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`);
    if (ok) {
      await deleteDoc(doc(dbService, "nweets", `${nweetObj.id}`));
      await deleteObject(ref(storageService, nweetObj.attachmentUrl));
      console.log("삭제");
    }
  };

  const toggleEditting = () => {
    setEditing((prev) => !prev);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const NweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`);
    await updateDoc(NweetTextRef, {
      text: newNweet,
    });
    setEditing(false);
  };

  const onChange = (event) => {
    // target = event.target.value
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };
  return (
    <div className="who">
      <div> {nweetObj.creatorEmail} </div>
      {editng ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              onChange={onChange}
              type="text"
              placeholder="내용을 입력해주세요"
              value={newNweet}
              required
            />
            <input type="submit" value="작성하기"></input>
          </form>
          <button onClick={toggleEditting}> 취소 </button>
        </>
      ) : (
        <div className="Message_Container">
          <div className="Message">{nweetObj.text}</div>
          {nweetObj.attachmentUrl && (
            <div className="Message_Image_Container">
              <img src={nweetObj.attachmentUrl} className="Message_Image" />
            </div>
          )}
          {isOwner && (
            <div className="Del_Edit_Container">
              <span onClick={onDeleteClick} className="Button_DelOrEdit">
                {" "}
                삭제하기
                <FontAwesomeIcon icon={faTrash} />{" "}
              </span>
              <span onClick={toggleEditting} className="Button_DelOrEdit">
                수정하기
                <FontAwesomeIcon icon={faPencilAlt} />{" "}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Nweet1;
