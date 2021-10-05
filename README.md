DooCoins - Kids rewards app

Gatsby + Dfinity Internet Computer

> npm install

Start dfx server

> dfx start

Start Internet Identity - see https://github.com/dfinity/internet-identity

> II_ENV=development dfx deploy --no-wallet --argument '(null)'

Deploy canisters locally

> dfx deploy

Start Gatsby

> npm start

or Deploy canisters to the network - see https://sdk.dfinity.org/docs/quickstart/network-quickstart.html

> dfx deploy --network ic

Issues - if having issues getting up and running, try deleting .dfx, .cache and public dirs. Setting computer time +1 hour was needed to get Internet Identity working

Methods

addChild
addTask
getChildren
getTasks
addGoal
currentGoal (assign current goal)
getGoals
claimGoal
getCurrentGoal
getTransactions
approveTask
updateTask
updateChild
getBalance
