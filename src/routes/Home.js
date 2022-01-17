import React, { useState, useEffect } from 'react';
import { dbService } from 'fbase';
import Nweet1 from 'components/Nweet';
import { collection, onSnapshot, orderBy, query } from '@firebase/firestore';
import NweetFactory from '../components/NweetFactory';
import Modal from 'components/Modal';

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);
  const [toggleposting, setTogglePosting] = useState(false); // 메세지 작성 폼
  const [onPosting, setOnPosting] = useState(true); // 작성 버튼 표시여부에 대한
  const onScroll = (event) => {
    console.log('온스크롤 확인');
    event.preventDefault();
  }; // 모달 스크롤에 대한
  const togglePosting = () => {
    setOnPosting(false);
  };
  const OnPostClick = () => {
    setTogglePosting(true);
    togglePosting();
  };
  const onSubmitComplete = () => {
    setTogglePosting(false);
    setOnPosting(true);
  };

  useEffect(() => {
    const q = query(
      collection(dbService, 'nweets'),
      orderBy('createdAt', 'desc')
    );
    onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((doc) => {
        const item = {
          id: doc.id,
          ...doc.data(),
        };
        console.log(item);
        return item;
      });
      setNweets(nweetArr);
    });
  }, []);

  return (
    <div className="Home_container">
      {toggleposting && (
        <Modal>
          <NweetFactory
            userObj={userObj}
            onSubmitComplete={onSubmitComplete}
            OnPostClick={OnPostClick}
            togglePosting={togglePosting}
          />
        </Modal>
      )}
      {onPosting && (
        <div className="Posting_test" onClick={OnPostClick}>
          메세지 작성
        </div>
      )}
      <div className="abcde">
        {nweets.map((nweet) => (
          <Nweet1
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorID === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
