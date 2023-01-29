import { WhopSDK } from "@whop-sdk/core";
import type { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

/**
 * gets the UserService from the WhopSDK from the session
 * @in getServerSideProps and api routes
 */
const getSdk = async (
  req: GetServerSidePropsContext["req"],
  res: GetServerSidePropsContext["res"]
) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return {};
  return {
    sdk: new WhopSDK({ TOKEN: session.accessToken }).userOAuth,
    user: session.user,
  };
};

export default getSdk;
