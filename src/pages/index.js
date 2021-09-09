import * as React from "react";
import { Link } from "gatsby";
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import Header from "../components/Header";
import logo from '../images/logo.svg';
import ChildList from "../components/ChildList";
import TaskList from "../components/TaskList";
import AddChild from "../components/AddChild";
import AddTask from "../components/AddTask";

import "./index.css";

const IndexPage = () => {
  const [actor, setActor] = React.useState(null);
  // const [myChildren, setChildren] = React.useState([]);
  // const [childrenLoaded, setChildrenLoaded] = React.useState(false);
  const [newChild, setNewChild] = React.useState(null);
  const [newTask, setNewTask] = React.useState(null);
  const [selectedChild, setSelectedChildId] = React.useState(null);
  const [selectedChildName, setSelectedChildName] = React.useState(null);
  const ref = React.useRef();


  // function getChildren() {
  //   actor?.getChildren().then((returnedChilren) => {
  //       setChildren(returnedChilren);
  //       setChildrenLoaded(true);
  //   });
  //    return false;
  // }


// getChild needs to call getTasks, getTransactions, getGoals, getCurrentGoal, getBalance

  function getChild(child_id, child_name) {
    setSelectedChildId(child_id);
    setSelectedChildName(child_name);
    return false;
  }

  function handleTaskComplete(task_id) {
    console.log(task_id);
  }

  function handleAddChild(e) {
    e.preventDefault();
    const inputs = e.target.querySelectorAll("input");
    const child_name = e.target.querySelector('input[name="child_name"]').value;
    const child_object = {name:child_name}
    actor?.addChild(child_object).then(() => {
      setNewChild(child_name);
      inputs.forEach((input) => {
        input.value = "";
      });
    });
    return false;
  }

  function handleAddTask(e) {
    e.preventDefault();
    const inputs = e.target.querySelectorAll("input");
    const task_name = e.target.querySelector('input[name="task_name"]').value;
    const task_value = parseInt(e.target.querySelector('input[name="task_value"]').value);
    const task_object = {name:task_name,value:task_value};
    actor?.addTask(task_object,selectedChild).then(() => {
      inputs.forEach((input) => {
        input.value = "";
      });
      setNewTask(task_name);
    });
    return false;
  }

  React.useEffect(() => {
    import("../declarations/doocoins")
    .then((module) => {setActor(module.doocoins)})
  }, []);

  // React.useEffect(() => {
  //   getChildren();
  // }, [actor, newChild]);

  return (
    <>
      <title>DooCoins</title>
      <div className="side-nav">
        <Link className="logo-group" to="/">
          <img src={logo} className="logo-img" alt="doo logo" />
        </Link>
      </div>
      <Header childName={selectedChildName} />
      <div className="main">
      <div className="left-panel">
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
                <h2 className="panel-header-link" onClick={() => ref.current.toggle() }>Add a child</h2> 
              </div>

              <ChildList
              getChild = {getChild} 
              // myChildren = {JSON.stringify(myChildren)} 

              />


            </section>
          </FrontSide>
          <BackSide>
            <section>
              <div className="panel-header">
                <h2>Add a child</h2>
                <h2 className="panel-header-link" onClick={() => ref.current.toggle() }>My children</h2> 
              </div>
              <AddChild 
                handleAddChild = {handleAddChild} 
                childID = {selectedChild}
              />
            </section>
          </BackSide>
        </Flippy>

        </div>

        <div className="right-panel">
          <section>
            <div className="panel-header">
              <h2>Wallet</h2>
            </div>
          </section>

          <section>
            <div className="panel-header">
              <h2>Goal</h2>
              <h2 className="panel-header-link" onClick={() => ref.current.toggle() }>Set Goal</h2> 
            </div>
          </section>

          <section>
            <div className="panel-header">
            <h2>Tasks</h2>
            </div>
            <TaskList
              selectedChild = {selectedChild}
              newTask = {newTask}
              handleTaskComplete = {handleTaskComplete}
            />
            <h2>Add a Task</h2>
            <AddTask 
              handleAddTask = {handleAddTask} 
            />
          </section>
        </div>

      </div>
    </>
  );
};

export default IndexPage;