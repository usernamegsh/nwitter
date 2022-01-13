import { react, useState } from 'react';
import Navigation from 'components/Navigation';
import { dbService } from 'fbase';
import { v4 as uuidv4 } from 'uuid';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  getDocs,
  query,
} from '@firebase/firestore';
import {
  ref,
  uploadString,
  getDownloadURL,
  getStorage,
} from '@firebase/storage';

const NweetFactory = ({ userObj, onSubmitComplete }) => {
  const [nweet, setNweet] = useState('');
  const [attachment, setAttachment] = useState('');
  const [isLoadding, setIsLoadding] = useState(false); // 작성하기 예외처리
  console.log(userObj);
  console.log(JSON.stringify(userObj));

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      if (isLoadding) {
        return;
      }
      if (!userObj?.uid) {
        return;
      } // early return
      setIsLoadding(true);
      let attachmentUrl = '';
      if (attachment !== '') {
        //파일 경로 참조 만들기
        const storage = getStorage();
        const fileRef = ref(storage, `${userObj.uid}/${uuidv4()}`);

        //storage 참조 경로로 파일 업로드 하기
        const uploadFile = await uploadString(fileRef, attachment, 'data_url');

        //storage에 있는 파일 URL로 다운로드 받기
        attachmentUrl = await getDownloadURL(uploadFile.ref);
      }

      const nweetObj = {
        text: nweet,
        createdAt: Date.now(),
        creatorID: userObj.uid,
        attachmentUrl,
        creatorEmail: userObj.email,
      };

      const docRef = await addDoc(collection(dbService, 'nweets'), nweetObj);
      setNweet('');
      setAttachment('');
    } catch (error) {
      alert(error);
    } finally {
      setIsLoadding(false);
      if (typeof onSubmitComplete === 'function') {
        onSubmitComplete();
      }
    }
  };

  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const onFileChange = (event) => {
    try {
      const {
        target: { files },
      } = event;
      const theFile = files[0];
      console.log(theFile);
      const reader = new FileReader();
      reader.onloadend = (finishedEvent) => {
        const {
          currentTarget: { result },
        } = finishedEvent;
        setAttachment(result);
      };
      reader.readAsDataURL(theFile);
    } catch (error) {
      console.error(error);
    }
  };

  const onClearAttachment = () => {
    setAttachment(null);
  };

  return (
    <form onSubmit={onSubmit} className="Onsubmit_Container">
      <div> {isLoadding ? '로딩중' : '완료'} </div>
      <div>
        <textarea
          type="text"
          onChange={onChange}
          placeholder={'내용 입력 후, 작성 버튼을 클릭해주세요.'}
          value={nweet}
          className="Input_Tweet"
        />
        <input
          type="file"
          onChange={onFileChange}
          accept="image/*"
          id="inputFile"
          style={{ display: 'none' }}
        />
        <label for="inputFile" className="Input_File">
          파일선택{' '}
        </label>
        {attachment && (
          <div>
            <img
              src={attachment}
              style={{
                backgroundImage: attachment,
                width: '50px',
                height: '50px',
              }}
            />
            <div onClick={onClearAttachment} className="RemoveFile">
              <span>사진 지우기</span>
            </div>
          </div>
        )}
        <input
          type="submit"
          value="작성하기"
          className="Button_UpdateMessage"
        />
        <input type="button" value="취소하기" onClick={onSubmitComplete} />
      </div>
    </form>
  );
};

export default NweetFactory;
