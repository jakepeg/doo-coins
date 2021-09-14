import * as React from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const GoalProgress = (props) => {

  const [actor, setActor] = React.useState(null);
  const [currentGoal, setCurrentGoal] = React.useState(null);
  const [goals, setGoals] = React.useState({});
  const [goalValue, setGoalValue] = React.useState(null);
  const [goalName, setGoalName] = React.useState(null);

  function getGoals(child) {
    actor?.getGoals(child).then((returnedGoals) => {
      const goals = Object.values(returnedGoals);
      setGoals(goals);
    });
    return false;
  }

  function getCurrentGoal(child) {
    actor?.getCurrentGoal(child).then((returnedGoal) => {
      setCurrentGoal(returnedGoal);
    });
    return false;
  }

  function getNameValue() {
    if(goals.length > 0 ) {
      let info = goals[0].filter(x => x.id === currentGoal);
      setGoalName(info[0].name);
      setGoalValue(parseInt(info[0].value));
    }
  }

  React.useEffect(() => {
    import("../declarations/doocoins")
    .then((module) => {setActor(module.doocoins)})
  }, [props.selectedChild]);

  React.useEffect(() => {
    getGoals(props.selectedChild);
    getCurrentGoal(props.selectedChild);
  }, [props.selectedChild, props.newGoal, props.currentGoal]);

  // React.useEffect(() => {

  // }, [goals]);

  React.useEffect(() => {
    getNameValue();
    console.log("current goal")
  }, [currentGoal]);

  return (
    <div className="goal">
      <div className="goal-info">
        <p className="goal-name">{goalName}</p>
        <button className="claim">Claim</button>
      </div>
      <div className="goal-progress">
        <CircularProgressbar 
          strokeWidth="12" 
          value={props.balance} 
          maxValue={goalValue} 
          text={`${props.balance}`} 
          styles={buildStyles({
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: 'butt',
            // Text size
            textSize: '1.5em',
            // Colors
            pathColor: `hsl(184, 81%, 37%)`,
            textColor: 'hsl(184, 81%, 37%)',
            trailColor: 'hsl(205, 67%, 96%)',
          })}

        />
        <p className="goal-value">of {goalValue}</p>
      </div>
    </div>
  );
};

export default GoalProgress;