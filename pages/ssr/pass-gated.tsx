import { usePurchaseLink } from "@/lib/get-purchase-link";
import getSdk from "@/lib/get-user-sdk/pages";
import findPass from "@/lib/has-pass";
import { AccessPass, Membership, Plan } from "@whop-sdk/core";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import ServerSDK from "@/lib/sdk";

/**
 * a list of pass IDs that are allowed to view this page
 */
const ALLOWED_PASS: string = process.env.NEXT_PUBLIC_REQUIRED_PASS || "";
/**
 * a plan that is recommended to buy if the user does not
 * own a required pass
 */
const RECOMMENDED_PLAN = process.env.NEXT_PUBLIC_RECOMMENDED_PLAN_ID || "";

type PassGatedProps =
  | {
      membership: Membership;
      pass: null;
      plan: null;
    }
  | {
      membership: null;
      pass: AccessPass;
      plan: Plan;
    };

const Page: NextPage<PassGatedProps> = ({ membership, pass, plan }) => {
  const link = usePurchaseLink(RECOMMENDED_PLAN);
  if (!membership) {
    return (
      <>
        Pass: {JSON.stringify(pass, null, 2)}
        Plan: {JSON.stringify(plan, null, 2)}
        <Link href={link}>
          <button>Buy Access Pass</button>
        </Link>
      </>
    );
  }
  return <>Pass owned Membership: {JSON.stringify(membership, null, 2)}</>;
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
  const membership = await findPass(sdk, ALLOWED_PASS);
  if (membership)
    return {
      props: {
        membership,
        pass: null,
        plan: null,
      },
    };
  else {
    const [pass, plan] = await Promise.all([
      ServerSDK.accessPasses.retrieveAccessPass({
        id: ALLOWED_PASS,
      }),
      ServerSDK.plans.retrievePlan({
        id: RECOMMENDED_PLAN,
      }),
    ]);
    return {
      props: {
        membership: null,
        pass,
        plan,
      },
    };
  }
};
