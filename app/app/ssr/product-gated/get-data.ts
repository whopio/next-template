import ServerSDK from "@/lib/sdk";
import { cache } from "react";

export const retrievePlan = cache((id: string) => {
  return ServerSDK.plans.retrievePlan({ id });
});

export const retrieveProduct = cache((id: string) => {
  return ServerSDK.products.retrieveProduct({ id });
});
