import getSdk from "@/lib/get-user-sdk/app";
import { cached as findPass } from "@/lib/has-pass";
import Head from "next/head";
import Image from "next/image";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import styles from "../../../../styles/Home.module.css";
import { retrievePlan } from "./get-data";
import PurchaseLink from "./PurchaseLink";

/**
 * a list of pass IDs that are allowed to view this page
 */
const ALLOWED_PASS: string = process.env.NEXT_PUBLIC_REQUIRED_PASS || "";
/**
 * a plan that is recommended to buy if the user does not
 * own a required pass
 */
const RECOMMENDED_PLAN = process.env.NEXT_PUBLIC_RECOMMENDED_PLAN_ID || "";

export default async function SSRPassGatedLayout({
  children,
}: PropsWithChildren<{}>) {
  // get the sdk from the user session and redirect if not logged in
  const { sdk } = await getSdk();
  if (!sdk) return redirect("/app/ssr");
  // find the membership
  const membership = await findPass(sdk, ALLOWED_PASS);
  // show a buy link if no membership matches
  if (!membership) {
    /**
     * fetch the recommended plan to display what users
     * will be buying.
     */
    const plan = await retrievePlan(RECOMMENDED_PLAN);
    return (
      <>
        <div className={styles.container}>
          <Head>
            <title>Paywall App</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main className={styles.main}>
            <h1 className={styles.title}>
              Purchase{" "}
              <PurchaseLink plan={RECOMMENDED_PLAN}>Access</PurchaseLink>
            </h1>
            <p className={styles.description}>
              This page is shown to a user who is signed in, but does not
              currently own an Access Pass.
              <br></br>
              <br></br>You can edit this page in{" "}
              <code className={styles.code}>pages/ssr/pass-gated.tsx</code>
            </p>
            <div className={styles.grid}>
              <PurchaseLink className={styles.card} plan={RECOMMENDED_PLAN}>
                <h2>Buy Access &rarr;</h2>
                <p>Purchase via Whop.</p>
              </PurchaseLink>
            </div>

            <p style={{ textAlign: "center" }}>
              Recommended Pricing Plan:{" "}
              <code>{JSON.stringify({ plan }, null, 2)}</code>
            </p>
            <p style={{ textAlign: "center" }}>User has membership: No</p>
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
        Plan: {JSON.stringify(plan, null, 2)}
        <PurchaseLink plan={RECOMMENDED_PLAN}>
          <button>Buy Access Pass</button>
        </PurchaseLink>
      </>
    );
  }
  return children;
}
