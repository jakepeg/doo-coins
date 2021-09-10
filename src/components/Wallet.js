import * as React from "react";
import dc from '../images/dc.svg';

const Wallet = (props) => {
  const [actor, setActor] = React.useState(null);
  const [balance, setBalance] = React.useState(null);

  function getBalance() {
    actor?.getBalance(props.selectedChild).then((returnedBalance) => {
      // console.log("returnedBalance = "+Object.values(returnedBalance))
      console.log("returnedBalance = "+returnedBalance)
      setBalance(parseInt(returnedBalance));
    });
    return false;
  }

  React.useEffect(() => {
    import("../declarations/doocoins")
    .then((module) => {setActor(module.doocoins)})
  }, []);

  React.useEffect(() => {
    getBalance();
  }, [props.selectedChild, props.taskComplete, props.goalClaimed]);

  return (
      <>
        <p><img src={dc} className="dc-img" alt="DooCoins symbol" />{balance}</p>
      </>
  );
};

export default Wallet;