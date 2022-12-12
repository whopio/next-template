import { NextPage } from "next";
import Link from "next/link";

const IndexPage: NextPage = () => {
  return (
    <>
      <Link href="/ssr">
        <button>pages</button>
      </Link>
      <Link href="/app/ssr">
        <button>app</button>
      </Link>
    </>
  );
};

export default IndexPage;
