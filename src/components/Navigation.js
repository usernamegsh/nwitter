import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "styles.css";

const Navigation = ({ userObj }) => {
  return (
    <nav className="Nav_Container">
      <div className="Nav_Container_Inner">
        <Link to="/" className="Nav_Container_Inner_Inner">
          <FontAwesomeIcon icon={faTwitter} color={"white"} size="2x" />
        </Link>

        <Link to="/profile" className="Nav_Container_Inner_Inner">
          <FontAwesomeIcon icon={faUser} color={"white"} size="2x" />
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
