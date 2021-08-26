import * as React from "react";
import { useRef } from 'react';
import { Link } from "gatsby";
import uuid from "react-uuid";
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import Header from "../components/Header";
import ChildList from "../components/ChildList";
import AddChild from "../components/AddChild";
// import RemoveChild from "../components/RemoveChild";
import "./index.css";
import logo from '../images/logo.svg';


const IndexPage = () => {
  const [actor, setActor] = React.useState(null);
  const [myChildren, setChildren] = React.useState([]);
  const [newChild, setNewChild] = React.useState(null);
  const childID = uuid();
  const ref = useRef();

  function getMyChildren() {
    actor?.getChildren().then((returnedChilren) => {
      if (!returnedChilren.length) {
        return alert("No children - please add a child to begin");
      }
      setChildren(returnedChilren);
      console.log(myChildren);
    });
    return false;
  }

  function handleAddChild(e) {
    e.preventDefault();
    const inputs = e.target.querySelectorAll("input");
    const child_name = e.target.querySelector('input[name="child_name"]').value;
    const child_info = [];
    const wallet_balance = 0
    child_info.push(child_name);
    child_info.push(wallet_balance);
      actor?.addChild(childID, JSON.stringify(child_info)).then(() => {
        setNewChild(child_name);
      inputs.forEach((input) => {
        input.value = "";
      });
    });
    return false;
  }

  React.useEffect(() => {
    import("../declarations/doocoins")
    .then((module) => {setActor(module.doocoins)})
  }, []);

  React.useEffect(() => {
    getMyChildren();
  }, [actor, newChild]);

  return (
    <>
      <title>DooCoins</title>
      <div className="sidenav">
        <Link className="logo-group" to="/">
          <img src={logo} className="logo-img" alt="doo logo" />
        </Link>
      </div>
      <Header />
      <div className="main">
        <Flippy
        flipOnClick={false}
        flipDirection="horizontal"
        ref={ref}
        style={{ width: '600px', boxShadow: '0, 0, 0, 0' }}
        >
          <FrontSide>
            <section>
              <div className="panel-header">
                <h2>My children</h2>
                <h2 className="panel-header-link" onClick={() => { ref.current.toggle(); }}>Add a child</h2> 
              </div>
              <ChildList
              myChildren = {myChildren} />
            </section>
          </FrontSide>
          <BackSide>
            <section>
              <div className="panel-header">
                <h2>Add a child</h2>
                <h2 className="panel-header-link" onClick={() => { ref.current.toggle(); }}>My children</h2> 
              </div>
              <AddChild 
                handleAddChild = {handleAddChild} 
                childID = {childID}
              />
            </section>
          </BackSide>
        </Flippy>
        {/* <RemoveChild /> */}
      </div>
    </>
  );
};

export default IndexPage;