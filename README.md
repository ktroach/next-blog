# Next Blog

This is just a prototype for a simple Blog site built in NextJS. Leveraging ContentLayer and MDX to create a Blog site with typical CMS style Admin features. The purpose is to be a proof of concept for using ContentLayer as a quasi-headless CMS. 

How does it work? Checkout ContentLayer's docs on how it is similar to a headless CMS but without the overhead and complexity that is typically associated with a CMS. ContentLayer allows you to write your content in MDX, it compiles and generates the MDX into an EJS module. The generated EJS modules are packaged so that you can import them into your React components. See https://website-git-new-landing-page-schick.vercel.app/docs/concepts/how-contentlayer-works

Forked from Skateshop13. Credits to sadmann7 for creating the stack and the excellent NextJS project, Skateshop13:
https://github.com/sadmann7
https://github.com/sadmann7/skateshop


> **Warning**
> This project is still in development and is not ready for production use.
>
> It uses new technologies (server actions, drizzle ORM) which are subject to change and may break your application.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **User Management:** [Clerk](https://clerk.com)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com)
- **Email:** [React Email](https://react.email)
- **Content Management:** [Contentlayer](https://www.contentlayer.dev)
- **File Uploads:** [uploadthing](https://uploadthing.com)
- **Payments infrastructure:** [Stripe](https://stripe.com)

## Features to be implemented

- [x] Authentication with **Clerk**
- [x] File uploads with **uploadthing**
- [x] Newsletter subscription with **React Email** and **Resend**
- [x] Blog using **MDX** and **Contentlayer**
- [x] ORM using **Drizzle ORM**
- [x] Database on **PlanetScale**
- [x] Validation with **Zod**
- [x] Storefront with products, categories, and subcategories
- [x] Seller and customer workflows
- [x] User subscriptions with **Stripe**
- [ ] Checkout with **Stripe Checkout**
- [ ] Admin dashboard with stores, products, orders, subscriptions, and payments

## Running Locally

1. Clone the repository

```bash
git clone https://github.com/sadmann7/skateshop.git
```

2. Install dependencies using pnpm

```bash
pnpm install
```

3. Copy the `.env.example` to `.env` and update the variables.

```bash
cp .env.example .env
```

4. Start the development server

```bash
pnpm run dev
```

5. Push the database schema

```bash
pnpm run db:push
```

6. Start the Stripe webhook listener

```bash
pnpm run stripe:listen
```

## How do I deploy this?

Follow the deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.


## License

Licensed under the MIT License. Check the [LICENSE](./LICENSE) file for details.
