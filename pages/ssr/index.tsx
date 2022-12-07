import { UserProps } from "@/lib/get-user-server-side";
import { NextPage } from "next";
import { signIn, signOut } from "next-auth/react";

const page: NextPage<UserProps> = ({ user }) => {
  if (!user)
    return <button onClick={() => signIn("whop")}>Log in with Whop</button>;
  return <button onClick={() => signOut()}>Log out</button>;
};

export default page;

export { default as getServerSideProps } from "@/lib/get-user-server-side";
