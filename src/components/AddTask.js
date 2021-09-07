import * as React from "react";

const AddTask = (props) => {

  return (
      <form onSubmit={props.handleAddTask}>
          <label htmlFor="task_name">
            Task name<br /><br />
            <input type="text" name="task_name" autoComplete="task name" />
          </label>
          <br /><br />
          <label htmlFor="task_value">
            Task value<br /><br />
            <input type="number" name="task_value" autoComplete="task value" />
          </label>
          <br /><br />
        <button type="submit">Add Task</button>
      </form>
  );
};

export default AddTask;