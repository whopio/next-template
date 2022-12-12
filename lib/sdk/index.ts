import { WhopSDK } from "@whop-sdk/core";

const sdk = new WhopSDK({
  TOKEN: process.env.WHOP_BOT_TOKEN,
  HEADERS: {
    "Whop-Company": process.env.WHOP_COMPANY_ID!,
  },
});

export default sdk;
