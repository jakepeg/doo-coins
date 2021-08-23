import * as React from "react";
import ChildList from "../components/ChildList";
import AddChild from "../components/AddChild";
import uuid from "react-uuid";
import RemoveChild from "../components/RemoveChild";

const IndexPage = () => {

  const [actor, setActor] = React.useState(null);
  const [myChildren, setChildren] = React.useState([]);
  const [newChild, setNewChild] = React.useState(null);

  const childID = uuid();

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
      <h1>DooCoins</h1>
        <ChildList
        myChildren = {myChildren} />
        <AddChild 
          handleAddChild = {handleAddChild} 
          childID = {childID}
         />
        <RemoveChild />
    </>
  );
};

export default IndexPage;