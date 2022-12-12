import getSdk from "@/lib/get-user-sdk/app";
import { cached as findPass } from "@/lib/has-pass";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
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
        Plan: {JSON.stringify(plan, null, 2)}
        <PurchaseLink plan={RECOMMENDED_PLAN}>
          <button>Buy Access Pass</button>
        </PurchaseLink>
      </>
    );
  }
  return children;
}
