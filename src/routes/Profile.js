import authService from "fbase";
import { getFirestore } from "firebase/firestore";
import { updateProfile } from "@firebase/auth";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { React, useEffect, useState } from "react";
import { useNavigate, useOutlet } from "react-router-dom";

const Profile = ({ userObj }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };
  const dbService = getFirestore();
  const getMyNweets = async () => {
    // fireStore는 Non-Sql 형태라 query 형태로 만들어줘야 함.
    const q = query(
      collection(dbService, "nweets"),
      where("creatorID", "==", userObj.uid)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " 내 계정으로 작성한 글 목록 ", doc.data());
    });
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(userObj, {
        displayName: newDisplayName,
      });
    }
  };

  //

  useEffect(() => {
    getMyNweets();
  }, []);
  return (
    <div className="Profile_Container">
      <button onClick={onLogOutClick} className="Button_Logout">
        로그아웃 하기
      </button>
    </div>
  );
};

export default Profile;
