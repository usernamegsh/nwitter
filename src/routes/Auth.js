import React, { useState } from "react";
import authService from "fbase";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import AuthForm from "../components/AuthForm";

const Auth = () => {
  const onSocialClick = async (e) => {
    const {
      target: { name },
    } = e;
    let provider;
    try {
      if (name === "google") {
        provider = new GoogleAuthProvider();
        const result = await signInWithPopup(authService, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
      } else if (name === "github") {
        provider = new GithubAuthProvider();
        const result = await signInWithPopup(authService, provider);
        const credential = GithubAuthProvider.credentialFromResult(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Login_body">
      <div className="Auth_Container">
        <div className="Login_Title">로그인 후, 메세지를 작성해주세요</div>
        <div className="Auth">
          <AuthForm />
          <div className="SocialLogin_Container">
            <button
              onClick={onSocialClick}
              name="google"
              className="SocialLogin_button"
            >
              구글 로그인 <FontAwesomeIcon icon={faGoogle} />
            </button>
            <button
              onClick={onSocialClick}
              name="github"
              className="SocialLogin_button"
            >
              깃허브 로그인 <FontAwesomeIcon icon={faGithub} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Auth;
