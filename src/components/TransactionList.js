import * as React from "react";
import Moment from 'react-moment';
import play from '../images/play.svg';
import dc from '../images/dc.svg';

const TransactionList = (props) => {
  const [actor, setActor] = React.useState(null);
  const [transactions, setTransactions] = React.useState({});

  function getTransactions(child) {
    actor?.getTransactions(child).then((returnedTransactions) => {
      const transactions = Object.values(returnedTransactions);
      setTransactions(transactions);
      console.log("transactions = "+transactions)
    });
    return false;
  }

  React.useEffect(() => {
    import("../declarations/doocoins")
    .then((module) => {setActor(module.doocoins)})
  }, []);

  React.useEffect(() => {
    getTransactions(props.selectedChild);
  }, [props.selectedChild, props.balance]);

  return (
      <>
            {/* {tasks.length > 0 &&
                tasks[0].map(task => (
                  <div className="row" key={parseInt(task.id)} onClick={() => props.handleTaskComplete(parseInt(task.id))}>
                    <div className="col-large"><p className="col-p">{task.name}</p></div>
                    <div className="col-small"><p className="col-p"><img src={dc} className="dc-img" alt="DooCoins symbol" />{parseInt(task.value)}</p></div>
                    <div className="col-small"><img src={play} className="play-img" alt="right arrow" /></div>
                  </div> 
                ))
            } */}

            {transactions.length > 0 &&
              transactions[0].map(transaction => (
                  <div className="row" key={parseInt(transaction.id)}>
                    <div className="col-medium"><p className="col-p"><Moment format="DD/MM/YY" unix>{transaction.completedDate}</Moment></p></div>
                    <div className="col-large"><p className="col-p">{transaction.name}</p></div>
                    <div className="col-small"><p className="col-p"><img src={dc} className="dc-img" alt="DooCoins symbol" />{parseInt(transaction.value)}</p></div>
                  </div> 
                ))
            }
      </>
  );
};

export default TransactionList;