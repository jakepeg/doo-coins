import * as React from "react";
import { Link } from "gatsby";
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import Header from "../components/Header";
import logo from '../images/logo.svg';
import Wallet from "../components/Wallet";
import ChildList from "../components/ChildList";
import TaskList from "../components/TaskList";
import GoalList from "../components/GoalList";
import AddChild from "../components/AddChild";
import AddTask from "../components/AddTask";
import AddGoal from "../components/AddGoal";
import "./index.css";

const IndexPage = () => {
  const [actor, setActor] = React.useState(null);
  const [newChild, setNewChild] = React.useState(null);
  const [newTask, setNewTask] = React.useState(null);
  const [taskComplete, setTaskComplete] = React.useState(null);
  const [goalClaimed, setGoalClaimed] = React.useState(null);
  const [newGoal, setNewGoal] = React.useState(null);
  const [selectedChild, setSelectedChildId] = React.useState(null);
  const [selectedChildName, setSelectedChildName] = React.useState(null);
  const ref = React.useRef();

// getChild needs to call getTasks, getTransactions, getGoals, getCurrentGoal, getBalance

  function getChild(child_id, child_name) {
    setSelectedChildId(child_id);
    setSelectedChildName(child_name);
    return false;
  }

  function handleTaskComplete(task_id) {
    console.log(task_id);
    let r = window.confirm("Is the task complete?");
    if (r == true) {
      console.log("You pressed OK!");
      setTaskComplete(parseInt(task_id));
    } else {
      console.log("You pressed cancel!");
    }
  }

  function handleSetGoal(goal_id) {
    console.log(goal_id);
    ref.current.toggle();
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

  function handleAddGoal(e) {
    e.preventDefault();
    const inputs = e.target.querySelectorAll("input");
    const goal_name = e.target.querySelector('input[name="goal_name"]').value;
    const goal_value = parseInt(e.target.querySelector('input[name="goal_value"]').value);
    const goal_object = {name:goal_name,value:goal_value};
    actor?.addGoal(goal_object,selectedChild).then(() => {
      inputs.forEach((input) => {
        input.value = "";
      });
      setNewGoal(goal_name);
    });
    return false;
  }

  React.useEffect(() => {
    import("../declarations/doocoins")
    .then((module) => {setActor(module.doocoins)})
  }, []);

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
            <section className="section-medium">
              <div className="panel-header">
                <h2>My children</h2> 
              </div>
              <ChildList
              getChild = {getChild} 
              selectedChild = {selectedChild}
              />
              <h4>Add a child</h4>
              <AddChild 
                handleAddChild = {handleAddChild} 
                childID = {selectedChild}
              />
            </section>
        </div>

        <div className="right-panel">
          <section className="fixed-height section-large wallet">
            <div className="panel-header">
              <h2>Wallet</h2>
            </div>
            <Wallet
              selectedChild = {selectedChild}
              taskComplete = {taskComplete}
              goalClaimed = {goalClaimed}
            />
          </section>

          <Flippy
            flipOnClick={false}
            flipDirection="horizontal"
            ref={ref}
            style={{ width: '390px', boxShadow: '0, 0, 0, 0' }}
          >
          <FrontSide>
            <section className="fixed-height section-large">
              <div className="panel-header">
                <h2>Goal</h2>
                <h2 className="panel-header-link" onClick={() => ref.current.toggle() }>Set Goal</h2> 
              </div>
            </section>
          </FrontSide>
          <BackSide>
            <section className="section-large">
              <div className="panel-header">
                <h2>Set Goal</h2>
                <h2 className="panel-header-link" onClick={() => ref.current.toggle() }>Goal</h2> 
              </div>
              <GoalList
                selectedChild = {selectedChild}
                newGoal = {newGoal}
                handleSetGoal = {handleSetGoal}
              />
              <h4>Add a goal</h4>
              <AddGoal 
                handleAddGoal = {handleAddGoal} 
              />
            </section>
          </BackSide>
        </Flippy>

        <section className="section-large">
            <div className="panel-header">
            <h2>Tasks</h2>
            </div>
            <TaskList
              selectedChild = {selectedChild}
              newTask = {newTask}
              handleTaskComplete = {handleTaskComplete}
            />
            <h4>Add a Task</h4>
            <AddTask 
              handleAddTask = {handleAddTask} 
            />
          </section>


          <section className="section-large">
            <div className="panel-header">
              <h2>Transactions</h2>
            </div>
          </section>


        </div>

      </div>
    </>
  );
};

export default IndexPage;