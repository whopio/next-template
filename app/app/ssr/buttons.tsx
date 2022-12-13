"use client";

import { signIn, signOut } from "next-auth/react";
import { FunctionComponent } from "react";

const Button: FunctionComponent<{
  loggedIn?: boolean;
  children: any;
}> = ({ loggedIn = false, children }) => {
  return (
    <a
      href="#"
      style={{ textDecoration: "underline" }}
      onClick={() => (loggedIn ? signOut() : signIn("whop"))}
    >
      {children}
    </a>
  );
};

export default Button;
