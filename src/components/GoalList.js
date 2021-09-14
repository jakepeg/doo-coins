import * as React from "react";
import play from '../images/play.svg';
import dc from '../images/dc.svg';

const GoalList = (props) => {
  const [actor, setActor] = React.useState(null);
  const [goals, setGoals] = React.useState({});

  function getGoals(childId) {
    actor?.getGoals(childId).then((returnedGoals) => {
      const goals = Object.values(returnedGoals);
      console.log(goals)
      setGoals(goals);
    });
    return false;
  }

  React.useEffect(() => {
    import("../declarations/doocoins")
    .then((module) => {setActor(module.doocoins)})
  }, []);

  React.useEffect(() => {
    getGoals(props.selectedChild);
  }, [props.selectedChild, props.newGoal]);

  return (
      <>
            {goals.length > 0 &&
                goals[0].map(goal => (
                  <div className="row" key={parseInt(goal.id)} onClick={() => props.handleSetGoal(parseInt(goal.id))}>
                    <div className="col-large"><p className="col-p">{goal.name}</p></div>
                    <div className="col-small"><p className="col-p"><img src={dc} className="dc-img" alt="DooCoins symbol" />{parseInt(goal.value)}</p></div>
                    <div className="col-small"><img src={play} className="play-img" alt="right arrow" /></div>
                  </div> 
                ))
            }
      </>
  );
}

export default GoalList;