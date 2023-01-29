import getSdk from "@/lib/get-user-sdk/pages";
import findProduct from "@/lib/has-product";
import { Membership } from "@whop-sdk/core";
import { NextApiHandler } from "next";

export type HasProductResponse = {
  membership: Membership | null;
};

const handler: NextApiHandler<HasProductResponse> = async (req, res) => {
  const { sdk } = await getSdk(req, res);
  if (!sdk) {
    return res.status(403).end();
  }
  const { allowedProducts } = req.body as {
    allowedProducts: string | string[];
  };
  const membership = await findProduct(sdk, allowedProducts);
  res.json({
    membership,
  });
};

export default handler;
