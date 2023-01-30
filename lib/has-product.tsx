import type { UserOAuthService } from "@whop-sdk/core/node/services/UserOAuthService";
import { cache } from "react";

/**
 * helper to check if a user owns a certain product,
 * @returns the membership of the matched product.
 */
const findProduct = async (
  sdk: UserOAuthService,
  allowedProducts: string | string[]
) => {
  if (typeof allowedProducts === "string") allowedProducts = [allowedProducts];
  const memberships = (await sdk.listUsersMemberships({ valid: true })).data;
  return (
    memberships?.find(
      (membership) =>
        membership.product && allowedProducts.includes(membership.product)
    ) || null
  );
};

export default findProduct;

/**
 * wrapped findProduct in React.cache for use in the
 * app directory
 */
export const cached = cache(findProduct);
