"use client";

import { usePurchaseLink } from "@/lib/get-purchase-link";
import Link from "next/link";
import { FunctionComponent, PropsWithChildren } from "react";

type PurchaseLinkProps = {
  plan: string;
  redirect?: string;
};

const PurchaseLink: FunctionComponent<PropsWithChildren<PurchaseLinkProps>> = ({
  plan,
  redirect,
  children,
}) => {
  const link = usePurchaseLink(plan, redirect);
  return <Link href={link}>{children}</Link>;
};

export default PurchaseLink;
