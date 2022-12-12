import getSdk from "@/lib/get-user-sdk/app";
import { NextAppPage } from "@/types/app-dir";
import Link from "next/link";
import Button from "./buttons";

const Page: NextAppPage = async () => {
  const { sdk } = await getSdk();
  return (
    <>
      <Button loggedIn={!!sdk} />
      {sdk && (
        <>
          <Link href="/app/ssr/pass-gated">
            <button>SSR Pass Gated</button>
          </Link>
          <Link href="/app/ssg/pass-gated">
            <button>SSG Pass Gated</button>
          </Link>
        </>
      )}
    </>
  );
};

export default Page;
