"use client";

import { signIn, signOut } from "next-auth/react";
import { FunctionComponent } from "react";
import styles from "../../../styles/Home.module.css";

const Button: FunctionComponent<{
  loggedIn?: boolean;
  children: any;
}> = ({ loggedIn = false, children }) => {
  return (
    <a
      href="#"
      className={styles.card}
      onClick={() => (loggedIn ? signOut() : signIn("whop"))}
    >
      {children}
    </a>
  );
};

export default Button;
