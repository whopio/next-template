import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const IndexPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Paywall App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to{" "}
          <a target="_blank" href="https://dash.whop.com">
            Whop!
          </a>
        </h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="/ssr" className={styles.card}>
            <h2>Pages (Next 12) &rarr;</h2>
            <p>
              View an implementation of our payment gate with the pages
              directory.
            </p>
          </a>

          <a href="/app/ssr" className={styles.card}>
            <h2>App (Next 13) &rarr;</h2>
            <p>
              View an implementation of our payment gate with the app directory.
            </p>
          </a>

          <a href="https://dev.whop.com" className={styles.card}>
            <h2>More Docs &rarr;</h2>
            <p>Discover all of the things you can do with Whop API.</p>
          </a>

          <a
            href="https://whop.com?source=nextjs"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h2>Marketplace &rarr;</h2>
            <p>View the Whop marketplace where your app can live!</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
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
  );
};

export default IndexPage;
