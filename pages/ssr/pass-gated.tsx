import { usePurchaseLink } from "@/lib/get-purchase-link";
import getSdk from "@/lib/get-sdk/pages";
import findPass from "@/lib/has-pass";
import { Membership } from "@whop-sdk/core";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";

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

type PassGatedProps = {
  membership: Membership | null;
};

const Page: NextPage<PassGatedProps> = ({ membership }) => {
  const link = usePurchaseLink(RECOMMENDED_PLAN);
  if (!membership) {
    return (
      <Link href={link}>
        <button>Buy Access Pass</button>
      </Link>
    );
  }
  return <>Pass owned</>;
};

export default Page;

/**
 * This first makes sure the user is logged in, redirecting them if they are not
 * and then checks if the user owns a membership specified in the ALLOWED_PASSES
 * array.
 */
export const getServerSideProps: GetServerSideProps<PassGatedProps> = async ({
  req,
  res,
}) => {
  const { sdk } = await getSdk(req, res);
  if (!sdk)
    return {
      redirect: {
        destination: "/ssr",
        permanent: false,
      },
    };
  const membership = await findPass(sdk, ALLOWED_PASSES);
  return {
    props: {
      membership,
    },
  };
};
