import { User } from "@whop-sdk/core";
import { GetServerSideProps } from "next";
import { pages as getSdk } from "./get-sdk";

export type UserProps = {
  user: User | null;
};

const getServerSideProps: GetServerSideProps<UserProps> = async ({
  req,
  res,
}) => {
  const { sdk } = await getSdk(req, res);
  const user = await sdk?.retrieveProfile();
  return {
    props: {
      user: user || null,
    },
  };
};

export default getServerSideProps;
