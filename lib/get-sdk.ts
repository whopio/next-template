import { WhopSDK } from "@whop-sdk/core";
import type { GetServerSidePropsContext } from "next";
import { unstable_getServerSession } from "next-auth";
import { NextRequestWithAuth } from "next-auth/middleware";
import { cache } from "react";
import { authOptions } from "./auth";

/**
 * gets the UserService from the WhopSDK from the session
 * @in getServerSideProps and api routes
 */
export const pages = async (
  req: GetServerSidePropsContext["req"],
  res: GetServerSidePropsContext["res"]
) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) return {};
  return {
    sdk: new WhopSDK({ TOKEN: session.accessToken }).user,
    user: session.user,
  };
};

/**
 * gets the UserService from the WhopSDK from the session
 * @in Server Components in the app directory
 * @dev wrapped in React.cache so other helpers that rely
 * on it can be properly cached too
 */
export const app = cache(async () => {
  const session = await unstable_getServerSession(authOptions);
  if (!session) return {};
  return {
    sdk: new WhopSDK({ TOKEN: session.accessToken }).user,
    user: session.user,
  };
});

/**
 * gets the UserService from the WhopSDK from the session
 * @in middleware
 */
export const middleware = (req: NextRequestWithAuth) => {
  const token = req.nextauth.token?.accessToken as string;
  if (!token) return {};
  return {
    sdk: new WhopSDK({ TOKEN: token }).user,
  };
};
