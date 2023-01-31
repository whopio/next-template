import { WhopSDK } from "@whop-sdk/core";

const sdk = new WhopSDK({
  TOKEN: process.env.WHOP_API_KEY,
});

export default sdk;
