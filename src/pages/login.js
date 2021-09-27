import * as React from "react";
import { AuthClient } from "@dfinity/auth-client";
// import { clear, get, remove, set } from "local-storage";
import { canisterId, createActor } from "../declarations/doocoins";

const LoginPage = () => {

  const [authClient, setAuthClient] = React.useState();
  const [actor, setActor] = React.useState();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const login = () => {
    authClient?.login({
      identityProvider: process.env.II_URL,
      onSuccess: () => {
        initActor();
        setIsAuthenticated(true);
      },
    });
  };

  const initActor = () => {
    const actor = createActor(canisterId, {
      agentOptions: {
        identity: authClient?.getIdentity(),
      },
    });
    setActor(actor);
  };

  const logout = () => {
    // clear();
    setIsAuthenticated(false);
    setActor(undefined);
  };

  React.useEffect(() => {
    AuthClient.create().then(async (client) => {
      const isAuthenticated = await client.isAuthenticated();
      setAuthClient(client);
      setIsAuthenticated(true);
    });
  }, []);

  React.useEffect(() => {
    if (isAuthenticated) initActor();
  }, [isAuthenticated]);


  return (
    <>
      <title>DooCoins</title>
      {!isAuthenticated && 
        <button type="button" onClick={() => login()}>Log in</button>
      }
      {isAuthenticated && 
      <button type="button" onClick={() => logout()}>Log out</button>
      }
    </>
  );



}

export default LoginPage;