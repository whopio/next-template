import { pages as getSdk } from "@/lib/get-sdk";
import findPass from "@/lib/has-pass";
import { Membership } from "@whop-sdk/core";
import { NextApiHandler } from "next";

export type HasPassResponse = {
  membership: Membership | null;
};

const handler: NextApiHandler<HasPassResponse> = async (req, res) => {
  const { sdk } = await getSdk(req, res);
  if (!sdk) {
    return res.status(403).end();
  }
  const { allowedPasses } = req.body as { allowedPasses: string | string[] };
  const membership = await findPass(sdk, allowedPasses);
  res.json({
    membership,
  });
};

export default handler;