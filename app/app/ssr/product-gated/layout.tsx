import getSdk from "@/lib/get-user-sdk/app";
import { cached as findProduct } from "@/lib/has-product";
import Head from "next/head";
import Image from "next/image";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import styles from "../../../../styles/Home.module.css";
import { retrievePlan } from "./get-data";
import PurchaseLink from "./PurchaseLink";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

/**
 * a list of product IDs that are allowed to view this page
 */
const ALLOWED_PRODUCT: string = process.env.NEXT_PUBLIC_REQUIRED_PRODUCT || "";
/**
 * a plan that is recommended to buy if the user does not
 * own a required product
 */
const RECOMMENDED_PLAN = process.env.NEXT_PUBLIC_RECOMMENDED_PLAN_ID || "";

export default async function SSRProductGatedLayout({
  children,
}: PropsWithChildren<{}>) {
  // get the sdk from the user session and redirect if not logged in
  const { sdk } = await getSdk();
  if (!sdk) return redirect("/app/ssr");
  // find the membership
  const membership = await findProduct(sdk, ALLOWED_PRODUCT);
  // show a buy link if no membership matches
  if (!membership) {
    /**
     * fetch the recommended plan to display what users
     * will be buying.
     */
    const plan = await retrievePlan(RECOMMENDED_PLAN);
    return (
      <>
        <main className={styles.main}>
          <div className={styles.description}>
            <a
              href="/app/ssr"
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>&lt;-</span> Go back
            </a>
            <p>
              Edit this page inside of{" "}
              <code className={styles.code}>app/app/ssr/layout.tsx</code>
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
                Purchase Access To Product
              </h1>
              <div
                style={{
                  paddingTop: "20px",
                }}
              >
                <p className={styles.card}>
                  This page is shown to a user who is signed in but does not
                  currently own a Product.
                </p>

                <p className={styles.card}>
                  Required product to own:{" "}
                  <code>{JSON.stringify(membership, null, "\t")}</code>
                </p>

                <p style={{ textAlign: "center" }} className={styles.card}>
                  Reccomended pricing plan:{" "}
                  <code>{JSON.stringify(plan, null, "\t")}</code>
                </p>

                <p style={{ textAlign: "center" }} className={styles.card}>
                  User has membership: No
                </p>
              </div>
            </div>
          </div>
          <div
            className={styles.grid}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PurchaseLink className={styles.card} plan={RECOMMENDED_PLAN}>
              <h2>Buy Access &rarr;</h2>
              <p>Purchase via Whop.</p>{" "}
            </PurchaseLink>{" "}
          </div>
        </main>
      </>
    );
  }
  return children;
}
