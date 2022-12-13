"use client";

import { signIn, signOut } from "next-auth/react";
import { FunctionComponent } from "react";

const Button: FunctionComponent<{
  loggedIn: boolean;
}> = ({ loggedIn, children }) => {
  if (!loggedIn)
    return (
      <a href="#" onClick={() => signIn("whop")}>
        {children}
      </a>
    );
  return (
    <a href="#" onClick={() => signOut()}>
      {children}
    </a>
  );
};

export default Button;
