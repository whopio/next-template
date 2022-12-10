import { NextPage } from "next";
import Link from "next/link";

const IndexPage: NextPage = () => {
  return (
    <>
      <Link href="/ssr">
        <button>SSR & pages login</button>
      </Link>
      <Link href="/ssr/logged-in">
        <button>SSR & pages login gated</button>
      </Link>
      <Link href="/ssr/pass-gated">
        <button>SSR & pages pass gated</button>
      </Link>
      <Link href="/ssg/pass-gated">
        <button>SSG & pages pass gated</button>
      </Link>
      <Link href="/app/ssr">
        <button>SSR & app login</button>
      </Link>
      <Link href="/app/ssr/pass-gated">
        <button>SSR & app pass gated</button>
      </Link>
      <Link href="/app/ssg/pass-gated">
        <button>SSG & app pass gated</button>
      </Link>
    </>
  );
};

export default IndexPage;
