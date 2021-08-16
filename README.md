DooCoins - Kids rewards app

Gatsby + Dfinity Internet Computer

> npm install

Start Gatsby on port 3000

> npm run develop -- --port 3000

Start dfx server

> dfx start

Deploy canisters locally

> dfx deploy

Deploy canisters to the network

Canister calls

> dfx canister call doocoins getChildren

> dfx canister call doocoins length

> dfx canister call doocoins addChild

- the following doesn't work, need to figure out how to pass array as argument

> dfx canister call doocoins addChild '("4c37e74-d0e0-4ad0-40f2-fdba7a1cf135", "["Quin",0]")'

> dfx canister call doocoins getChild "4c37e74-d0e0-4ad0-40f2-fdba7a1cf135"

> dfx canister call doocoins removeChild "4c37e74-d0e0-4ad0-40f2-fdba7a1cf135"
