import { React, useState, useEffect } from "react";
import AppRouter from "components/Routers";
import authService from "fbase";

function App() {
  const auth = authService;
  const [init, setInit] = useState(false);
  const [isLoggedIn, SetisLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        SetisLoggedIn(true);
        setUserObj(user);
      } else {
        SetisLoggedIn(false);
      }
      setInit(true);
      console.log("진행 중");
    });
  }, []);

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        "Initializing"
      )}
    </>
  );
}

export default App;
