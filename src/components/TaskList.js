import * as React from "react";
import play from '../images/play.svg';

const TaskList = (props) => {

  // const str = props.childTasks.slice(8, -3)
  // const childTasks = str.split("},{");

  return (
      <>
<div>names {props.taskNames}</div>
<div>values {props.taskValues}</div>
<div>ids {props.taskIds}</div>

              <div className="list-row">
                <div className="list-col-name">
                  {
                    props.taskNames.map((name, index) => 
                    <p key={index}>{name}</p>
                  )}
                </div>
                <div className="list-col-name">
                  {
                    props.taskValues.map((value, index) => 
                    <p key={index}>{value}</p>
                  )}
                </div>
                <div className="list-col-image"><img src={play} className="play-img" alt="right arrow" /></div>
              </div>

      </>
  );
};

export default TaskList;