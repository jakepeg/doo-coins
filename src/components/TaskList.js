import * as React from "react";

const TaskList = (props) => {
  const [actor, setActor] = React.useState(null);
  const [tasks, setTasks] = React.useState({});

  function getTasks(idarg) {
    actor?.getTasks(idarg).then((returnedTasks) => {
      const tasks = Object.values(returnedTasks);
      console.log(tasks)
      setTasks(tasks);
    });
    return false;
  }

  React.useEffect(() => {
    import("../declarations/doocoins")
    .then((module) => {setActor(module.doocoins)})
  }, []);

  React.useEffect(() => {
    getTasks(props.selectedChild);
  }, [props.selectedChild, props.newTask]);

  return (
      <>
            {tasks.length > 0 &&
                tasks[0].map(task => (
                <div key={parseInt(task.id)} onClick={() => props.handleTaskComplete(parseInt(task.id))}>
                    id={parseInt(task.id)}<br />
                    name={task.name}<br />
                    value={parseInt(task.value)} </div> 
                ))
            }
      </>
  );
};

export default TaskList;