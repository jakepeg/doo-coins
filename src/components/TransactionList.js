import * as React from "react";
import Moment from 'react-moment';
import dc from '../images/dc.svg';

const TransactionList = (props) => {
  const [actor, setActor] = React.useState(null);
  const [transactions, setTransactions] = React.useState({});

  function getTransactions(child) {
    // actor?.getTransactions(child).then((returnedTransactions) => {
    //   const transactions = Object.values(returnedTransactions);
    //   setTransactions(transactions);
    //   console.log("transactions = "+transactions)
    // });
    actor?.getTransactions(child).then((returnedTransactions) => {
      if ("ok" in returnedTransactions) {
        const transactions = Object.values(returnedTransactions);
        setTransactions(transactions);
      } else {
        console.error(returnedTransactions.err);
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
    getTransactions(props.selectedChild);
  }, [props.selectedChild, props.balance]);

  return (
      <>
            {transactions.length > 0 &&
              transactions[0].reverse().map(transaction => (
                  <div className={transaction.transactionType} key={parseInt(transaction.id)}>
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