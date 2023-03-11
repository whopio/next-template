import getSdk from "@/lib/get-user-sdk/pages";
import { User } from "@whop-sdk/core";
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";

/**
 * this page only shows if the user trying to view is is logged in
 */
const page: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = (
  user
) => {
  return <></>;
};

export default page;

/**
 * this uses the context to get the user-scoped SDK and then uses the SDK to fetch
 * the users profile. If the user is not logged in they will be redirected to /ssr.
 */
export const getServerSideProps: GetServerSideProps<{ user: User }> = async ({
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
  const user = await sdk.retrieveUsersProfile({});
  return {
    props: { user },
  };
};
