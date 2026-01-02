This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Local Development

This project uses pnpm.

**Important:** All commands must be run from the `site/` directory, or use `pnpm -C site <command>` from the repo root.

### From repo root (recommended)

Install dependencies:
```bash
pnpm -C site install
```

Run locally:
```bash
pnpm -C site dev
```

Build:
```bash
pnpm -C site build
```

Lint:
```bash
pnpm -C site lint:full
```

### From site/ directory

Alternatively, `cd site` first, then run commands without `-C site`:

```bash
cd site
pnpm install
pnpm dev
pnpm build
pnpm lint:full
```

**Note:** The Next.js DevTools "N" overlay is automatically hidden in development mode via CSS overrides.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
