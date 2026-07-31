# Makcu Website

Official MAKCU documentation and browser tools site built with Next.js and exported as a static site for GitHub Pages.

## Requirements

- Node.js 24.x
- pnpm 11.x via Corepack

## Setup

```bash
git clone https://github.com/terrafirma2021/makcu.com project-name
cd project-name
git submodule sync
git submodule update --init --recursive
corepack enable
corepack prepare pnpm@11.18.0 --activate
pnpm install
```

## Development

```bash
pnpm dev
```

For HTTPS Web Serial testing:

```bash
pnpm dev-ssl
```

## Static Build

```bash
pnpm build
```

The static site is written to `out/`.

Preview the exported site locally:

```bash
pnpm start
```

## GitHub Pages Deployment

Deployment is handled by `.github/workflows/pages.yml` on pushes to `main` and manual workflow runs.

In the repository settings, set Pages source to **GitHub Actions**. For the custom domain `makcu.com`, configure the domain in GitHub Pages settings and leave `NEXT_PUBLIC_BASE_PATH` unset. For project Pages without a custom domain, set the repository variable `NEXT_PUBLIC_BASE_PATH` to `/<repo-name>`.

The firmware list is loaded directly from the public GitHub contents API in the browser because GitHub Pages does not run server API routes.
