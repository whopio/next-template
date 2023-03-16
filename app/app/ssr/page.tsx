import getSdk from "@/lib/get-user-sdk/app";
import { NextAppPage } from "@/types/app-dir";
import { Inter } from "next/font/google";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../../styles/Home.module.css";
import Button from "./buttons";

const inter = Inter({ subsets: ["latin"] });

const Page: NextAppPage = async () => {
  const { sdk, user } = await getSdk();
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <a
          href="/"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>&lt;-</span> Go back
        </a>
        <p>
          Edit this page inside of{" "}
          <code className={styles.code}>app/app/ssr/index.tsx</code>
        </p>
      </div>

      <div className={styles.center}>
        <div className={styles.otherbox}>
          <h1
            className={inter.className}
            style={{
              paddingLeft: "5px",
            }}
          >
            Welcome to{" "}
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://dash.whop.com"
            >
              Whop
              {user
                ? `, ${(await sdk.retrieveUsersProfile({})).username}!`
                : `!`}
            </Link>
          </h1>
          <p
            className={inter.className}
            style={{
              paddingTop: "20px",
              paddingLeft: "5px",
            }}
          >
            This page could be your homepage before a user accesses your
            application, and this state is meant to represent a user who is{" "}
            <b>{user ? "logged in" : "logged out"}. </b> <br></br>
          </p>
          <div
            style={{
              paddingTop: "20px",
            }}
          >
            {sdk ? (
              <p style={{ textAlign: "center" }} className={styles.card}>
                Logged in user object:{" "}
                <code>{JSON.stringify(user, null, "\t")}</code>
              </p>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div>
        {!sdk ? (
          <div
            className={styles.grid}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button>
              <h2 className={inter.className}>Login &rarr;</h2>
              <p className={inter.className}>Proceed to sign in with Whop</p>
            </Button>
          </div>
        ) : (
          <div
            className={styles.grid}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button loggedIn={!!sdk}>
              <h2 className={inter.className}>&larr; Logout </h2>
              <p className={inter.className}>
                This is an SSR gating of your application.
              </p>
            </Button>
            <Link href="/app/ssr/product-gated" className={styles.card}>
              <h2 className={inter.className}>Application (SSR) &rarr;</h2>
              <p className={inter.className}>
                This is an SSR gating of your application.
              </p>
            </Link>
            <Link href="/app/ssg/product-gated" className={styles.card}>
              <h2 className={inter.className}>Application (SSG)&rarr;</h2>
              <p className={inter.className}>
                This is an SSG gating of your application.
              </p>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default Page;
