import { dbService, storageService } from 'fbase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from '@firebase/storage';
import { useState } from 'react/cjs/react.development';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import userEvent from '@testing-library/user-event';

const Nweet1 = ({ nweetObj, isOwner }) => {
  // console.log(nweetObj)
  // console.log(`${nweetObj.createdAt}`)
  
  const createdAt = typeof nweetObj.createdAt ==='number' ? 
  (new Date(nweetObj.createdAt)).toLocaleString()
  : '작성일이 파악되지 않았습니다.' // fallback 메세지
    const [editng, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const [openContextMenu, setOpenContextMenu] = useState(false);

  const onDeleteClick = async () => {
    const ok = window.confirm('삭제하시겠습니까?');
    const NweetTextRef = doc(dbService, 'nweets', `${nweetObj.id}`);
    if (ok) {
      await deleteDoc(doc(dbService, 'nweets', `${nweetObj.id}`));
      await deleteObject(ref(storageService, nweetObj.attachmentUrl));
    }
  };

  const toggleEditting = () => {
    setEditing((prev) => !prev);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const NweetTextRef = doc(dbService, 'nweets', `${nweetObj.id}`);
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
          <div className='Message_header'>
            <div className="CreatorID_Container"> 
              <div>{nweetObj.creatorEmail}</div>
              <div>{createdAt}</div>
            </div>
            <div>
            <button onClick={() => {setOpenContextMenu( (prev)=>!prev )}}> 햄버거 {`${openContextMenu}`} </button>
            </div>     
          </div>

          <div className="Message">{nweetObj.text}</div>
          {nweetObj.attachmentUrl && (
            <div className="Message_Image_Container">
              <img src={nweetObj.attachmentUrl} className="Message_Image" />
            </div>
          )}
          {isOwner && (
            <div className="Del_Edit_Container">
              <span onClick={onDeleteClick} className="Button_DelOrEdit">
                {' '}
                삭제하기
                <FontAwesomeIcon icon={faTrash} />{' '}
              </span>
              <span onClick={toggleEditting} className="Button_DelOrEdit">
                수정하기
                <FontAwesomeIcon icon={faPencilAlt} />{' '}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Nweet1;
