import * as React from "react";
import play from '../images/play.svg';
import dc from '../images/dc.svg';

const TaskList = (props) => {
  const [actor, setActor] = React.useState(null);
  const [tasks, setTasks] = React.useState({});

  function getTasks(child) {
    console.log("getTasks called for child id: "+child);
    // actor?.getTasks(child).then((returnedTasks) => {
    //   const tasks = Object.values(returnedTasks);
    //   setTasks(tasks);
    // });
    actor?.getTasks(child).then((returnedTasks) => {
      if ("ok" in returnedTasks) {
        const tasks = Object.values(returnedTasks);
        setTasks(tasks);
      } else {
        console.error(returnedTasks.err);
      }
    });
    return false;
  }

  const initActor = () => {
    import("../declarations/doocoins")
    .then((module) => {
      const actor = module.createActor(module.canisterId, {
        agentOptions: {
          identity: props.authClient?.getIdentity(),
        },
      });
      setActor(actor);
    })
  };

  React.useEffect(() => {
    if (props.isAuthenticated) initActor();
  }, [props.isAuthenticated]);

  React.useEffect(() => {
    getTasks(props.selectedChild);
  }, [props.selectedChild, props.newTask]);

  return (
      <>
            {tasks.length > 0 &&
                tasks[0].map(task => (
                  <div role="button" className="row" key={parseInt(task.id)} onClick={() => props.handleTaskComplete(parseInt(task.id))} onKeyDown={() => props.handleTaskComplete(parseInt(task.id))}>
                    <div className="col-large"><p className="col-p">{task.name}</p></div>
                    <div className="col-small"><p className="col-p"><img src={dc} className="dc-img" alt="DooCoins symbol" />{parseInt(task.value)}</p></div>
                    <div className="col-small"><img src={play} className="play-img" alt="right arrow" /></div>
                  </div> 
                ))
            }
      </>
  );
};

export default TaskList;