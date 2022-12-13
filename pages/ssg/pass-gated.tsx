import { NextPage } from "next";

/**
 * this page is gated on a middleware level
 */
const SSGPassGatedPage: NextPage = () => {
  return (
    <>
      This page is gated on a middleware level. If you do not own the required
      pass, then the user will be redirected to checkout. If you see this
      message, then you own a pass!
    </>
  );
};

export default SSGPassGatedPage;
