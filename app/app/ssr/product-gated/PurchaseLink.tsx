"use client";

import { usePurchaseLink } from "@/lib/get-purchase-link";
import Link from "next/link";
import { FunctionComponent, PropsWithChildren } from "react";
import styles from "../../../../styles/Home.module.css";

type PurchaseLinkProps = {
  plan: string;
  redirect?: string;
  className?: string;
};

const PurchaseLink: FunctionComponent<PropsWithChildren<PurchaseLinkProps>> = ({
  plan,
  redirect,
  className,
  children,
}) => {
  const link = usePurchaseLink(plan, redirect);
  return (
    <Link className={styles.card} href={link}>
      {children}
    </Link>
  );
};

export default PurchaseLink;
