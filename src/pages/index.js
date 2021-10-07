import * as React from "react";
import { AuthClient } from "@dfinity/auth-client";
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import Header from "../components/Header";
import Wallet from "../components/Wallet";
import ChildList from "../components/ChildList";
import TaskList from "../components/TaskList";
import TransactionList from "../components/TransactionList";
import GoalList from "../components/GoalList";
import GoalProgress from "../components/GoalProgress";
import AddChild from "../components/AddChild";
import AddTask from "../components/AddTask";
import AddGoal from "../components/AddGoal";
import "./index.css";

const IndexPage = () => {
  const [authClient, setAuthClient] = React.useState();
  const [actor, setActor] = React.useState();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [newChild, setNewChild] = React.useState(null);
  const [balance, setBalance] = React.useState(null);
  const [newTask, setNewTask] = React.useState(null);
  const [taskComplete, setTaskComplete] = React.useState(null);
  const [goalClaimed, setGoalClaimed] = React.useState(null);
  const [newGoal, setNewGoal] = React.useState(null);
  const [currentGoal, setCurrentGoal] = React.useState(null);
  const [selectedChild, setSelectedChildId] = React.useState(null);
  const [selectedChildName, setSelectedChildName] = React.useState(null);
  const [panelVisibility, setPanelVisibility] = React.useState('hide');
  
  const ref = React.useRef();

  const initActor = () => {
    import("../declarations/doocoins")
    .then((module) => {
      const actor = module.createActor(module.canisterId, {
        agentOptions: {
          identity: authClient?.getIdentity(),
        },
      });
      setActor(actor);
    })
  };

  const handleLogin = () => {
    authClient?.login({
      identityProvider: process.env.II_URL,
      onSuccess: () => {
        initActor();
        setIsAuthenticated(true);
      },
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActor(undefined);
  };

  function getChild(child_id, child_name) {
    console.log("child name = "+child_name);
    console.log("child id = "+child_id);
    setSelectedChildId(child_id);
    setSelectedChildName(child_name);
    setPanelVisibility('right-panel');
    return false;
  }

  function getBalance() {
    actor?.getBalance(selectedChild).then((returnedBalance) => {
      setBalance(parseInt(returnedBalance));
    });
    // actor?.getBalance(selectedChild).then((returnedBalance) => {
    //   if ("ok" in returnedBalance) {
    //     setBalance(parseInt(returnedBalance));
    //   } else {
    //     console.error(returnedBalance.err);
    //   }
    // });
    return false;
  }

  function handleTaskComplete(task_id) {
    let r = window.confirm("Is the task complete?");
    if (r == true) {
      let dateNum = Math.floor(Date.now() / 1000);
      let date = dateNum.toString();
      // actor?.approveTask(selectedChild,task_id,date).then(() => {
      //   setTaskComplete(parseInt(task_id));
      // });
      actor?.approveTask(selectedChild,task_id,date).then((returnedApproveTask) => {
        if ("ok" in returnedApproveTask) {
          setTaskComplete(parseInt(task_id));
        } else {
          console.error(returnedApproveTask.err);
        }
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
    // actor?.addChild(child_object).then(() => {
    //   setNewChild(child_name);
    //   inputs.forEach((input) => {
    //     input.value = "";
    //   });
    // });
    actor?.addChild(child_object).then((returnedAddChild) => {
      if ("ok" in returnedAddChild) {
        setNewChild(child_name);
        inputs.forEach((input) => {
          input.value = "";
        });
      } else {
        console.error(returnedAddChild.err);
      }
    });
    return false;
  }

  function handleAddTask(e) {
    e.preventDefault();
    const inputs = e.target.querySelectorAll("input");
    const task_name = e.target.querySelector('input[name="task_name"]').value;
    const task_value = parseInt(e.target.querySelector('input[name="task_value"]').value);
    const task_object = {name:task_name,value:task_value};
    // actor?.addTask(task_object,selectedChild).then(() => {
    //   inputs.forEach((input) => {
    //     input.value = "";
    //   });
    //   setNewTask(task_name);
    // });
    actor?.addTask(task_object,selectedChild).then((returnedAddTask) => {
      if ("ok" in returnedAddTask) {
        setNewTask(task_name);
        inputs.forEach((input) => {
          input.value = "";
        });
      } else {
        console.error(returnedAddTask.err);
      }
    });
    return false;
  }

  function handleAddGoal(e) {
    e.preventDefault();
    const inputs = e.target.querySelectorAll("input");
    const goal_name = e.target.querySelector('input[name="goal_name"]').value;
    const goal_value = parseInt(e.target.querySelector('input[name="goal_value"]').value);
    const goal_object = {name:goal_name,value:goal_value};
    // actor?.addGoal(goal_object,selectedChild).then(() => {
    //   inputs.forEach((input) => {
    //     input.value = "";
    //   });
    //   setNewGoal(goal_name);
    // });
    actor?.addGoal(goal_object,selectedChild).then((returnedAddGoal) => {
      if ("ok" in returnedAddGoal) {
        setNewGoal(goal_name);
        inputs.forEach((input) => {
          input.value = "";
        });
      } else {
        console.error(returnedAddGoal.err);
      }
    });
    return false;
  }

  function handleSetGoal(goal_id) {
    // actor?.currentGoal(selectedChild,goal_id).then(() => {
    //   setCurrentGoal(goal_id);
    //   ref.current.toggle();
    // });
    actor?.currentGoal(selectedChild,goal_id).then((returnedCurrentGoal) => {
      if ("ok" in returnedCurrentGoal) {
        setCurrentGoal(goal_id);
        ref.current.toggle();
      } else {
        console.error(returnedCurrentGoal.err);
      }
    });
  }

  function handleClaimGoal(goal_id) {
    let r = window.confirm("Are you sure?");
    if (r == true) {
      let dateNum = Math.floor(Date.now() / 1000);
      let date = dateNum.toString();
      // actor?.claimGoal(selectedChild,goal_id,date).then(() => {
      //   setGoalClaimed(parseInt(goal_id));
      // });
      actor?.claimGoal(selectedChild,goal_id,date).then((returnedClaimGoal) => {
        if ("ok" in returnedClaimGoal) {
          setGoalClaimed(parseInt(goal_id));
        } else {
          console.error(returnedClaimGoal.err);
        }
      });
    } else {
      console.log("You pressed cancel!");
    }
  }

  React.useEffect(() => {
    AuthClient.create().then(async (client) => {
      const isAuthenticated = await client.isAuthenticated();
      setAuthClient(client);
      setIsAuthenticated(true);
    });
  }, []);

  React.useEffect(() => {
    if (isAuthenticated) initActor();
  }, [isAuthenticated]);

  React.useEffect(() => {
    getBalance();
  }, [selectedChild, taskComplete, goalClaimed]);

  return (
    <>
      <title>DooCoins</title>
      <Header 
        childName={selectedChildName} 
        selectedChild = {selectedChild}
        isAuthenticated = {isAuthenticated}
        handleLogin = {handleLogin}
        handleLogout = {handleLogout}
      />
      <div className="main">
      <div className="left-panel">
      {isAuthenticated &&
            <section className="section-medium">
              <div className="panel-header">
                <h2>My children</h2> 
              </div>
              <ChildList
              getChild = {getChild} 
              selectedChild = {selectedChild}
              newChild = {newChild}
              authClient = {authClient}
              isAuthenticated = {isAuthenticated}
              />
              <h4>Add a child</h4>
              <AddChild 
                handleAddChild = {handleAddChild} 
                childID = {selectedChild}
              />
            </section>
      }
        </div>
        <div className={panelVisibility}>
      {isAuthenticated &&
          <section className="fixed-height section-large wallet">
            <div className="panel-header">
              <h2>Wallet</h2>
            </div>
            <Wallet
              balance = {balance}
              name = {selectedChildName}
            />
          </section>
        }
        {isAuthenticated &&
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
                authClient = {authClient}
                isAuthenticated = {isAuthenticated}
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
                authClient = {authClient}
                isAuthenticated = {isAuthenticated}
              />
              <h4>Add a goal</h4>
              <AddGoal 
                handleAddGoal = {handleAddGoal} 
              />
            </section>
          </BackSide>
        </Flippy>
      }
      {isAuthenticated &&
        <section className="section-large">
            <div className="panel-header">
            <h2>Tasks</h2>
            </div>
            <TaskList
              selectedChild = {selectedChild}
              newTask = {newTask}
              handleTaskComplete = {handleTaskComplete}
              authClient = {authClient}
              isAuthenticated = {isAuthenticated}
            />
            <h4>Add a Task</h4>
            <AddTask 
              handleAddTask = {handleAddTask} 
            />
          </section>
        }
        {isAuthenticated &&
          <section className="section-large">
            <div className="panel-header">
              <h2>Transactions</h2>
            </div>
            <TransactionList
              selectedChild = {selectedChild}
              balance = {balance}
              authClient = {authClient}
              isAuthenticated = {isAuthenticated}
            />
          </section>
          }
        </div>

      </div>
    </>
  );
};

export default IndexPage;