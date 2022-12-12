import getSdk from "@/lib/get-user-sdk/app";
import findPass from "@/lib/has-pass";
import { NextAppPage } from "@/types/app-dir";

const ALLOWED_PASS: string = process.env.NEXT_PUBLIC_REQUIRED_PASS || "";

/**
 * The Layout of this level is pass-gated, which makes
 * and page child gated without extra configuration.
 */
const Page: NextAppPage = async () => {
  /**
   * get the sdk and membership again here, this is
   * only done to get the data and not to verify the user
   * owns the pass. if the user does not own the pass this
   * section will never be rendered as the layout already
   * verifies that the pass is owned.
   */
  const { sdk } = await getSdk();
  const membership = (await findPass(sdk!, ALLOWED_PASS))!;
  return (
    <>
      {JSON.stringify(membership, null, 2)}
      Pass owned!
    </>
  );
};

export default Page;
