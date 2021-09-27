import * as React from "react";
import { AuthClient } from "@dfinity/auth-client";

const LoginPage = () => {

  const init = async () => {
    const authClient = await AuthClient.create();
    if (await authClient.isAuthenticated()) {
      handleAuthenticated(authClient);
    }
  
    const loginButton = document.getElementById("loginButton");
    loginButton.onclick = async () => {
      await authClient.login({
        identityProvider: process.env.II_URL,
      });
    };
  };
  
  async function handleAuthenticated(authClient) {
    const identity = await authClient.getIdentity();
    
  }

  React.useEffect(() => {
    init();
  }, []);


  return (
    <>
      <title>DooCoins</title>
      <button type="button" id="loginButton">Log in</button>
    </>
  );
};

export default LoginPage;