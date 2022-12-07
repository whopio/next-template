import getPurchaseLink from "@/lib/get-purchase-link";
import { app as getSdk } from "@/lib/get-sdk";
import { cached as findPass } from "@/lib/has-pass";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

/**
 * a list of pass IDs that are allowed to view this page
 */
const ALLOWED_PASSES: string[] = ["pass_PWR383wNV3raE"];
/**
 * a plan that is recommended to buy if the user does not
 * own a required pass
 */
const RECOMMENDED_PLAN = "plan_OZheinzlmzTEk";

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
      <Link
        href={
          getPurchaseLink(
            process.env.NEXT_PUBLIC_WHOP_COMPANY_NAME!,
            RECOMMENDED_PLAN,
            "/app/ssr/pass-gated"
          ).href
        }
      >
        Buy Access Pass
      </Link>
    );
  }
  return children;
}