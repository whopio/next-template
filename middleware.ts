import { middleware as getSdk } from "@/lib/get-sdk";
import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";
import getPurchaseLink from "./lib/get-purchase-link";
import findPass from "./lib/has-pass";

const ALLOWED_PASSES: string[] = ["pass_PWR383wNV3raE"];
const RECOMMENDED_PLAN = "plan_OZheinzlmzTEk";

export default withAuth(async (req) => {
  const { sdk } = getSdk(req);
  if (!sdk) return NextResponse.redirect(new URL("/ssr", req.nextUrl.origin));

  const membership = await findPass(sdk, ALLOWED_PASSES);
  if (membership) return NextResponse.next();
  return NextResponse.redirect(
    getPurchaseLink(RECOMMENDED_PLAN, "/ssg/pass-gated")
  );
});

export const config = {
  matcher: ["/app/ssg/pass-gated", "/ssg/pass-gated"],
};
