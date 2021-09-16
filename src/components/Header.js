import * as React from "react";
import { Link } from "gatsby";
import ImageUpload from "./ImageUpload";
import logo from '../images/logo.svg';

const Header = (props) => {

  return (
    <div className="header">
      <Link className="logo-group" to="/">
        <img src={logo} className="logo-img" alt="doo logo" /> <span className="logo-type">DooCoins</span>
      </Link>
      <div className="header-menu">
      <span className="logo-type">{props.childName}</span>
        <ImageUpload 
          selectedChild = {props.selectedChild} 
        />
      </div>
    </div>
  );
};

export default Header;