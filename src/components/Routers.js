import { React, useState } from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";
import "styles.css";

const AppRouter = ({ userObj, isLoggedIn }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <div>
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Home userObj={userObj} />} />
              <Route path="/profile" element={<Profile userObj={userObj} />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Auth />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
