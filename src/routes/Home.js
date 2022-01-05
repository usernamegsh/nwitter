import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import Nweet1 from "components/Nweet";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import NweetFactory from "../components/NweetFactory";

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);
  useEffect(() => {
    const q = query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArr);
    });
  }, []);

  return (
    <div className="Home_container">
      <NweetFactory userObj={userObj} />
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
