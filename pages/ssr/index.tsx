import { UserProps } from "@/lib/get-user-server-side";
import { NextPage } from "next";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

const Page: NextPage<UserProps> = ({ user }) => {
  return (
    <>
      {user ? (
        <button onClick={() => signOut()}>Log out</button>
      ) : (
        <button onClick={() => signIn("whop")}>Log in with Whop</button>
      )}

      {user && (
        <>
          <Link href="/ssr/pass-gated">
            <button>SSR Pass Gated</button>
          </Link>
          <Link href="/ssg/pass-gated">
            <button>SSG Pass Gated</button>
          </Link>
          User: {JSON.stringify(user, null, 2)}
        </>
      )}
    </>
  );
};

export default Page;

export { default as getServerSideProps } from "@/lib/get-user-server-side";
