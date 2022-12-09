import getSdk from "@/lib/get-sdk/app";
import { NextAppPage } from "@/types/app-dir";
import Button from "./buttons";

const Page: NextAppPage = async () => {
  const { sdk } = await getSdk();
  return <Button loggedIn={!!sdk} />;
};

export default Page;
