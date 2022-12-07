const getPurchaseLink = (company: string, plan: string, redirect: string) => {
  const href = new URL(`https://whop.com/${company}/plan/${plan}/checkout/`);
  const onSuccess = new URL(redirect, process.env.NEXTAUTH_URL);
  href.searchParams.set("onSuccess", onSuccess.href);
  return href;
};

export default getPurchaseLink;
