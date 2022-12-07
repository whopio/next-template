"use client";

import { signIn, signOut } from "next-auth/react";
import { FunctionComponent } from "react";

const Button: FunctionComponent<{
  loggedIn: boolean;
}> = ({ loggedIn }) => {
  if (!loggedIn)
    return <button onClick={() => signIn("whop")}>Log in with Whop</button>;
  return <button onClick={() => signOut()}>Log out</button>;
};

export default Button;
