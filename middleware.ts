import getSdk from "@/lib/get-user-sdk/middleware";
import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";
import getPurchaseLink from "./lib/get-purchase-link";
import findProduct from "./lib/has-product";

const ALLOWED_PRODUCTS: string[] =
  process.env.NEXT_PUBLIC_REQUIRED_PRODUCT?.split(",") || [];
const RECOMMENDED_PLAN = process.env.NEXT_PUBLIC_RECOMMENDED_PLAN_ID || "";

export default withAuth(async (req) => {
  const { sdk } = getSdk(req);
  const isApp = req.nextUrl.pathname.startsWith("/app");
  if (!sdk)
    return NextResponse.redirect(
      new URL(isApp ? "/app/ssr" : "/ssr", req.nextUrl.origin)
    );

  const membership = await findProduct(sdk, ALLOWED_PRODUCTS);
  if (membership) return NextResponse.next();
  return NextResponse.redirect(
    getPurchaseLink(RECOMMENDED_PLAN, req.nextUrl.pathname, req.nextUrl)
  );
});

export const config = {
  matcher: ["/app/ssg/product-gated", "/ssg/product-gated"],
};
