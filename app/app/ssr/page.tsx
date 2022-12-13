import getSdk from "@/lib/get-user-sdk/app";
import { NextAppPage } from "@/types/app-dir";
import Image from "next/image";
import styles from "../../../styles/Home.module.css";
import Button from "./buttons";

const Page: NextAppPage = async () => {
  const { sdk, user } = await getSdk();
  return (
    <>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://dash.whop.com"
            >
              Whop!
            </a>
          </h1>
          <p className={styles.description}>
            This page could be your homepage before a user accesses your
            application, and this state is meant to represent a user who is{" "}
            <b>{sdk ? "logged in" : "logged out"}. </b>{" "}
            {sdk && <Button loggedIn={!!sdk}> Click here to logout</Button>}
            <br></br>
            <br></br>You can edit this page in{" "}
            <code className={styles.code}>pages/app/page.tsx</code>
          </p>

          {!sdk ? (
            <div className={styles.grid}>
              <a href="#" className={styles.card}>
                <Button>
                  <h2>Login &rarr;</h2>
                  <p>Proceed to sign in with Whop</p>
                </Button>
              </a>
            </div>
          ) : (
            <>
              <p style={{ textAlign: "center" }}>
                Logged in user object: {JSON.stringify(user, null, 2)}
              </p>
              <div className={styles.grid}>
                <a href="/app/ssr/pass-gated" className={styles.card}>
                  <h2>Access Application &rarr;</h2>
                  <p>This is an SSR gating of your application.</p>
                </a>
                <a href="/app/ssg/pass-gated" className={styles.card}>
                  <h2>Access Application &rarr;</h2>
                  <p>This is an SSG gating of your application.</p>
                </a>
              </div>
            </>
          )}
        </main>

        <footer className={styles.footer}>
          <a
            href="https://dash.whop.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <span className={styles.logo}>
              <Image src="/logo.svg" alt="Whop Logo" width={72} height={16} />
            </span>
          </a>
        </footer>
      </div>
    </>
  );
};

export default Page;
