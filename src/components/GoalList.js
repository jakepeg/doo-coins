import * as React from "react";
import play from '../images/play.svg';
import dc from '../images/dc.svg';

const GoalList = (props) => {
  const [actor, setActor] = React.useState(null);
  const [goals, setGoals] = React.useState({});

  function getGoals(childId) {
    // actor?.getGoals(childId).then((returnedGoals) => {
    //   const goals = Object.values(returnedGoals);
    //   setGoals(goals);
    // });
    actor?.getGoals(childId).then((returnedGoals) => {
      if ("ok" in returnedGoals) {
        const goals = Object.values(returnedGoals);
        setGoals(goals);
      } else {
        console.error(returnedGoals.err);
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
    getGoals(props.selectedChild);
  }, [props.selectedChild, props.newGoal]);

  return (
      <>
            {goals.length > 0 &&
                goals[0].map(goal => (
                  <div role="button" className="row" key={parseInt(goal.id)} onClick={() => props.handleSetGoal(parseInt(goal.id))} onKeyDown={() => props.handleSetGoal(parseInt(goal.id))}>
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