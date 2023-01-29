import { NextPage } from "next";

/**
 * this page is gated on a middleware level
 */
const SSGProductGatedPage: NextPage = () => {
  return (
    <>
      This page is gated on a middleware level. If you do not own the required
      product, then the user will be redirected to checkout. If you see this
      message, then you own a product!
    </>
  );
};

export default SSGProductGatedPage;
