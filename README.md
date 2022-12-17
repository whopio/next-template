This is a [Next.js](https://nextjs.org/) project created using the [`whop-next-template`](https://github.com/whopio/next-template/)

## Getting Started

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwhopio%2Fnext-template&env=NEXT_PUBLIC_WHOP_CLIENT_ID,WHOP_CLIENT_SECRET,WHOP_BOT_TOKEN,NEXT_PUBLIC_RECOMMENDED_PLAN_ID,NEXT_PUBLIC_REQUIRED_PASS,NEXTAUTH_SECRET&envDescription=Follow%20the%20instructions%20here%20to%20obtain%20the%20env%20vars%20above%3A&envLink=https%3A%2F%2Fgithub.com%2Fwhopio%2Fnext-template%2Fblob%2Fmain%2F.env.example&project-name=whop-next-template&repository-name=whop-next-template&demo-title=Whop%20Next.js%20Template&demo-description=Whop%20Next.js%20Template&demo-url=https%3A%2F%2Fnext-template-whop.vercel.app%2F&demo-image=https%3A%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F4Xc0tWaSTiUEoRUI6Nyj4C%2F38157dced5977daa0a0ef2e093731023%2Fwhop-nextjs.png%3Fh%3D250)

First, set the required environment variables:

```.env
NEXT_PUBLIC_WHOP_CLIENT_ID="WHOP CLIENT ID"
WHOP_CLIENT_SECRET="WHOP CLIENT SECRET"
WHOP_BOT_TOKEN="WHOP API KEY"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="NEXTAUTH SECRET"
NEXT_PUBLIC_RECOMMENDED_PLAN_ID="PLAN ID"
NEXT_PUBLIC_REQUIRED_PASS="PASS ID"
```

Then, run the development server:

```bash
npm run dev
```

```bash
yarn dev
```

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This template offers examples on how to utilize next.js patterns in conjuction with `@whop-sdk/core` to easily gate certain parts of your website.

## Included exmples:

### `/pages` (Server-side rendered):

The examples in this list show how to use `getServerSideProps` in the `pages` directoy

- `pages/ssr/index.tsx` - Adds the whop `User` to the page props. It renders a login button for logged-out users and a logout button for logged-in users
- `pages/ssr/logged-in.tsx` - Only displays a page to logged-in users. If a logged-out user tries to access this page they will be redirected to `/ssr` where they can log in
- `pages/ssr/pass-gated.tsx` - Check if a user owns a specific `Pass` and only shows the page content if they do. If the user does not own the pass a button directing the user to the whop.com checkout page where they can buy a plan that unlocks the page.

### `/pages` (Statically rendered):

- `pages/ssg/pass-gated.tsx` - This example shows how to use `middleware` to prevent users without access to a certain `Pass` to visit this page. If a user that does not have access tries to request this page the `middleware` will redirect them to the whop.com checkout page where they can buy a plan that unlocks the page.

### `/app`:

The examples in this list show how to use `@whop-sdk/core` in the new `app` directory added in `next@13.0.0`

- `app/app/ssr/page.tsx`: This `page` shows how to obtain a user-scoped instaince of the WhopSDK UserService. If its able to obtain the sdk (the user is logged-in) it shows a logout button, if not it shows a login button
- `app/app/ssr/pass-gated/layout.tsx`: This `layout` shows how to lock a layout (and its children) for users that don't own a specific pass. If no pass is owned it renders a button that allows the user to purchase a pass unlocking the layout on whop.com
- `app/app/ssr/pass-gated/page.tsx`: This `page` is pass-gated without any extra setup as its parent `layout`(`app/app/ssr/pass-gated/layout.tsx`) is already pass-gated
- `app/app/ssg/pass-gated/page.tsx`: This `page` is protected by `middleware`, conceptually similar to `pages/ssg/pass-gated.tsx`

### `/api`:

- `pages/api/pass-gated.ts`: This `api route` uses the user session to obtain a user-scoped instance of the WhopSDK `UserService` and then uses that to check if the authorised used owns a certain pass.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [WhopSDK Documentation](https://dev.whop.com) - learn about Whop API features and how to use the SDK.
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [this templates' GitHub repository](https://github.com/whopio/next-template/) - your feedback and contributions are welcome!
