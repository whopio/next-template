import getSdk from "@/lib/get-user-sdk/middleware";
import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";
import getPurchaseLink from "./lib/get-purchase-link";
import findPass from "./lib/has-pass";

const ALLOWED_PASSES: string[] =
  process.env.NEXT_PUBLIC_REQUIRED_PASS?.split(",") || [];
const RECOMMENDED_PLAN = process.env.NEXT_PUBLIC_RECOMMENDED_PLAN_ID || "";

export default withAuth(async (req) => {
  const { sdk } = getSdk(req);
  const isApp = req.nextUrl.pathname.startsWith("/app");
  if (!sdk)
    return NextResponse.redirect(
      new URL(isApp ? "/app/ssr" : "/ssr", req.nextUrl.origin)
    );

  const membership = await findPass(sdk, ALLOWED_PASSES);
  if (membership) return NextResponse.next();
  return NextResponse.redirect(
    getPurchaseLink(RECOMMENDED_PLAN, req.nextUrl.pathname, req.nextUrl)
  );
});

export const config = {
  matcher: ["/app/ssg/pass-gated", "/ssg/pass-gated"],
};
