import * as React from "react";
import { Link } from "gatsby";
// import uuid from "react-uuid";
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import Header from "../components/Header";
import logo from '../images/logo.svg';
import ChildList from "../components/ChildList";
import AddChild from "../components/AddChild";
import AddTask from "../components/AddTask";
// import RemoveChild from "../components/RemoveChild";
import "./index.css";
import TaskList from "../components/TaskList";


// const idl = require('../utilities/idl');

const IndexPage = () => {
  const [actor, setActor] = React.useState(null);
  const [myChildren, setChildren] = React.useState([]);
  const [childrenLoaded, setChildrenLoaded] = React.useState(false);
  const [newChild, setNewChild] = React.useState(null);
  const [selectedChild, setSelectedChildId] = React.useState(null);
  const [selectedChildName, setSelectedChildName] = React.useState(null);
  // const [childTasks, setChildTasks,] = React.useState([]);
  const [taskNames, setTaskNames,] = React.useState([]);
  const [taskValues, setTaskValues,] = React.useState([]);
  const [taskIds, setTaskIds,] = React.useState([]);
  // const childID = uuid();
  const ref = React.useRef();


  function getChildren() {
    actor?.getChildren().then((returnedChilren) => {
        setChildren(returnedChilren);
        setChildrenLoaded(true);
    });
     return false;
  }

// put selected child into a useState var
// getChild needs to call getTasks, getTransactions, getGoals, getCurrentGoal, getBalance
// add put selected child name and image header

  function getChild(child_id, child_name) {
    setSelectedChildId(child_id);
    setSelectedChildName(child_name);
    getTasks(child_id);
    return false;
  }

  function getTasks(child_id) {
    actor?.getTasks(child_id).then((returnedTasks) => {
      // if (!returnedTasks.length) {
      //   return alert("No tasks yet");
      // }
      const tasks = Object.values(returnedTasks);
      const names = [];
      const values = [];
      const ids = [];
      tasks[0].map((task, index) => {
        names.push(task.name);
        values.push(parseInt(task.value));
        ids.push(parseInt(task.id));
      })
      setTaskNames(names);
      setTaskValues(values);
      setTaskIds(ids);
    });
    return false;
  }

  // function renderChildren() {
  //   console.log(myChildren);
  // }

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
    });
    return false;
  }

  // connect to the backend
  React.useEffect(() => {
    import("../declarations/doocoins")
    .then((module) => {setActor(module.doocoins)})
  }, []);

  // request the list of children
  React.useEffect(() => {
    getChildren();
  }, [actor, newChild]);

  // // render the list of children
  // React.useEffect(() => {
  //   renderChildren();
  // }, [myChildren]);

  return (
    <>
      <title>DooCoins</title>
      <div className="sidenav">
        <Link className="logo-group" to="/">
          <img src={logo} className="logo-img" alt="doo logo" />
        </Link>
      </div>
      <Header childName={selectedChildName} />
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
                <h2 className="panel-header-link" onClick={() => ref.current.toggle() }>Add a child</h2> 
              </div>
              {childrenLoaded &&
              <ChildList
              getChild = {getChild} 
              myChildren = {JSON.stringify(myChildren)} />
              }

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


        <section>
              <div className="panel-header">
                <h2>Add a Task</h2>
                <h2 className="panel-header-link" onClick={() => ref.current.toggle() }>My tasks</h2> 
              </div>
              <AddTask 
                handleAddTask = {handleAddTask} 
              />
        </section>

        <section>
              <div className="panel-header">
                <h2>Tasks</h2>
                <h2 className="panel-header-link" onClick={() => ref.current.toggle() }>Add tasks</h2> 
              </div>
              <TaskList 
                taskNames = {taskNames} 
                taskValues = {taskValues}
                taskIds = {taskIds}
              />
        </section>

        {/* <RemoveChild />
        <button onClick={() => getChildren()}>get children</button>
        <button onClick={() => renderChildren()}>log children</button> */}
      </div>
    </>
  );
};

export default IndexPage;