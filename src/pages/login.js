import * as React from "react";
import { AuthClient } from "@dfinity/auth-client";

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

function log() {
 console.log("identity = "+AuthClient.getIdentity())
}

async function handleAuthenticated(authClient) {
  const identity = await authClient.getIdentity();
  console.log("identity = "+JSON.stringify(identity));
  console.log("authClient = "+JSON.stringify(authClient));
}

const LoginPage = () => {

  return (
    <>
      <title>DooCoins</title>
      <button type="button" onClick={() => init()}>init</button>
      <button type="button" id="loginButton">Log in</button>
      <button type="button" onClick={() => log()}>Console log</button>
    </>
  );
};

export default LoginPage;