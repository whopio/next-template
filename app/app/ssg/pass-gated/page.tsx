import { NextAppPage } from "@/types/app-dir";

/**
 * this page is protected by the middleware, so if
 * no ssg-bailouts are used in here this page will
 * be statically served
 */
const Page: NextAppPage = () => {
  return <>Pass owned!</>;
};

export default Page;
