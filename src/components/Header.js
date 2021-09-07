import * as React from "react";

const Header = (props) => {

  return (
    <div className="header">
    <div className="header-info">info here</div>
    <div className="header-menu">{props.childName}</div>
    </div>
  );
};

export default Header;