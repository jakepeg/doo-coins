import * as React from "react";
import play from '../images/play.svg';
import dc from '../images/dc.svg';

const TaskList = (props) => {

  // const str = props.childTasks.slice(8, -3)
  // const childTasks = str.split("},{");

  return (
      <>

              <div className="list-row">
                <div className="list-col-taskname">
                  {
                    props.taskNames.map((name, index) => 
                    <p key={index}>{name}</p>
                  )}
                </div>
                <div className="list-col-taskvalue">
                  {
                    props.taskValues.map((value, index) => 
                    <p key={index}><img src={dc} className="dc-img" alt="DooCoins symbol" />{value}</p>
                  )}
                </div>
                <div className="list-col-image"><img src={play} className="play-img" alt="right arrow" /></div>
              </div>

      </>
  );
};

export default TaskList;