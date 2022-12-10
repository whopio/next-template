import getSdk from "@/lib/get-sdk/app";
import { cached as findPass } from "@/lib/has-pass";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import PurchaseLink from "./PurchaseLink";

/**
 * a list of pass IDs that are allowed to view this page
 */
const ALLOWED_PASSES: string[] =
  process.env.NEXT_PUBLIC_REQUIRED_PASS?.split(",") || [];
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
  const membership = await findPass(sdk, ALLOWED_PASSES);
  // show a buy link if no membership matches
  if (!membership) {
    return (
      <PurchaseLink plan={RECOMMENDED_PLAN}>
        <button>Buy Access Pass</button>
      </PurchaseLink>
    );
  }
  return children;
}
