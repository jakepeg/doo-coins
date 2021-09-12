import * as React from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const GoalProgress = (props) => {
  const dooCoins = 130;
  const goalAmount = 250;
  
  return (
      <div className="goal-progress">
        <CircularProgressbar value={dooCoins} maxValue={goalAmount} text={`${dooCoins} of ${goalAmount}`} />
      </div>
  );
};

export default GoalProgress;