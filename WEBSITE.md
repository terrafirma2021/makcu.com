# MAKCU Website Architecture

This repository contains the static MAKCU website, documentation, and browser-based device tools. It is built with Next.js App Router and exported to static files for GitHub Pages.

## Runtime Model

- Hosting: GitHub Pages
- Build output: `out/`
- Runtime server: none
- Middleware: none
- Next API routes: none
- Firmware listing: browser-side GitHub contents API calls from `lib/github-assets.ts`
- Locale routing: static `/en/` and `/cn/` routes with a browser redirect from `/`

## Project Structure

```text
app/
  layout.tsx                 Root HTML/body shell
  page.tsx                   Static locale redirect
  [lang]/                    Language-specific static routes
    layout.tsx               Dictionary/provider layout
    page.tsx                 Home page
    api/                     Public API documentation page
    device-control/          Device control tools
    discord/                 Static Discord redirect page
    docs/                    MDX documentation pages
    information/             Information page
    setup/                   Setup page
    troubleshooting/         Troubleshooting page
    xim/                     XIM integration page
components/                  React UI and device components
contents/docs/               Localized MDX docs content
fonts/                       Local fonts
langs/                       Locale metadata and dictionaries
lib/                         Static helpers, routes, markdown, GitHub assets, esptool-js flash helpers
public/                      Static media served by Pages
.github/workflows/pages.yml  GitHub Pages build and deploy workflow
```

## Static Export Requirements

`next.config.ts` enables static export:

```ts
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};
```

`NEXT_PUBLIC_BASE_PATH` is optional. Leave it empty for the custom domain `makcu.com`. Set it to `/<repo-name>` when serving from a project Pages URL without a custom domain.

## GitHub Pages Deployment

The workflow in `.github/workflows/pages.yml`:

1. Runs on pushes to `main` and manual dispatch.
2. Checks out the repo with submodules.
3. Uses Node 24 and pnpm 11.18.0.
4. Runs `pnpm install --frozen-lockfile`.
5. Runs `pnpm build` to generate `out/`.
6. Uploads the Pages artifact and deploys it to the `github-pages` environment.

Repository settings must use **Pages -> Source -> GitHub Actions**.

## Dynamic Data

GitHub Pages cannot run server routes. The firmware selectors now load available `.bin` files directly from:

```text
https://api.github.com/repos/terrafirma2021/MAKCM_v2_files/contents
```

The selected firmware is downloaded from the returned `raw.githubusercontent.com` URL in the browser.

## Local Development

```bash
corepack enable
corepack prepare pnpm@11.18.0 --activate
pnpm install
pnpm dev
```

For Web Serial testing over HTTPS:

```bash
pnpm dev-ssl
```

Build and preview the static export:

```bash
pnpm build
pnpm start
```

## Notes

- Web Serial requires HTTPS in production.
- Public media assets are served from `public/` through the Pages artifact.
- `.nojekyll` is included so GitHub Pages serves `_next/` assets correctly.
