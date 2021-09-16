import * as React from "react";
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import Header from "../components/Header";
import Wallet from "../components/Wallet";
import ChildList from "../components/ChildList";
import TaskList from "../components/TaskList";
import GoalList from "../components/GoalList";
import AddChild from "../components/AddChild";
import AddTask from "../components/AddTask";
import AddGoal from "../components/AddGoal";
import "./index.css";
import GoalProgress from "../components/GoalProgress";
import TransactionList from "../components/TransactionList";

const IndexPage = () => {
  const [actor, setActor] = React.useState(null);
  const [childClicked, setChildClicked] = React.useState(false);
  const [newChild, setNewChild] = React.useState(null);
  const [balance, setBalance] = React.useState(null);
  const [newTask, setNewTask] = React.useState(null);
  const [taskComplete, setTaskComplete] = React.useState(null);
  // const forceUpdate = React.useReducer(bool => !bool)[1];
  const [goalClaimed, setGoalClaimed] = React.useState(null);
  const [newGoal, setNewGoal] = React.useState(null);
  // const [goalName, setGoalName] = React.useState(null);
  // const [goalValue, setGoalValue] = React.useState(null);
  const [currentGoal, setCurrentGoal] = React.useState(null);
  const [selectedChild, setSelectedChildId] = React.useState(null);
  const [selectedChildName, setSelectedChildName] = React.useState(null);
  const ref = React.useRef();

// getChild needs to call getTasks, getTransactions, getGoals, getCurrentGoal, getBalance

  function getChild(child_id, child_name) {
    console.log("child name = "+child_name);
    console.log("child id = "+child_id);
    setChildClicked(true);
    setSelectedChildId(child_id);
    setSelectedChildName(child_name);
    return false;
  }

  function getBalance() {
    actor?.getBalance(selectedChild).then((returnedBalance) => {
      setBalance(parseInt(returnedBalance));
    });
    return false;
  }

  function handleTaskComplete(task_id) {
    console.log(task_id);
    let r = window.confirm("Is the task complete?");
    if (r == true) {
      let dateNum = Math.floor(Date.now() / 1000);
      let date = dateNum.toString();
      actor?.approveTask(selectedChild,task_id,date).then(() => {
        setTaskComplete(parseInt(task_id));
        // forceUpdate();
      });

    } else {
      console.log("You pressed cancel!");
    }
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

  // add a new goal
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

  // set current goal
  function handleSetGoal(goal_id) {
    actor?.currentGoal(selectedChild,goal_id).then(() => {
      console.log("new current goal = "+goal_id);
      setCurrentGoal(goal_id);
      ref.current.toggle();
    });
  }

  // claim goal
  function handleClaimGoal(goal_id) {
    let r = window.confirm("Are you sure?");
    if (r == true) {
      let dateNum = Math.floor(Date.now() / 1000);
      let date = dateNum.toString();
      actor?.claimGoal(selectedChild,goal_id,date).then(() => {
        setGoalClaimed(parseInt(goal_id));
      });
    } else {
      console.log("You pressed cancel!");
    }
  }

  React.useEffect(() => {
    import("../declarations/doocoins")
    .then((module) => {setActor(module.doocoins)})
  }, []);

  React.useEffect(() => {
    getBalance();
  }, [selectedChild, taskComplete, goalClaimed]);

  return (
    <>
      <title>DooCoins</title>
      {/* <div className="side-nav">
        <Link className="logo-group" to="/">
          <img src={logo} className="logo-img" alt="doo logo" />
        </Link>
      </div> */}
      <Header 
        childName={selectedChildName} 
        selectedChild = {selectedChild}
      />
      <div className="main">
      <div className="left-panel">
            <section className="section-medium">
              <div className="panel-header">
                <h2>My children</h2> 
              </div>
              <ChildList
              getChild = {getChild} 
              selectedChild = {selectedChild}
              newChild = {newChild}
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
              balance = {balance}
              name = {selectedChildName}
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
              <GoalProgress
                selectedChild = {selectedChild}
                newGoal = {newGoal}
                currentGoal = {currentGoal}
                balance = {balance}
                handleClaimGoal = {handleClaimGoal}
              />
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
                currentGoal = {currentGoal}
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
            <TransactionList
              selectedChild = {selectedChild}
              balance = {balance}
            />
          </section>
        </div>

      </div>
    </>
  );
};

export default IndexPage;