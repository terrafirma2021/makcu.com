# MAKCU visual refresh

## Objective

Rebuild MAKCU's public presentation as a modern device control surface while retaining the existing Next.js application, content, routes, integrations, and device workflows.

The visual reference is used only to identify design qualities: a near-black canvas, lime status colour, compact controls, crisp structural lines, strong device artwork, and a geometric product mark. No source code, component implementation, stylesheet, asset, product name, or user-facing copy is transferred from the reference product.

## Confirmed ownership

- Repository: `terrafirma2021/makcu.com`
- Delivery branch: `main`
- Deployment: `.github/workflows/pages.yml`
- Build output: static Next.js export in `out`
- Public hostname: `www.makcu.com`
- Starting revision: `d2468055b3e90488dbb2ec310a5873d2271c0031`

## Preserved product surface

The refresh must preserve all existing public routes and their English and Chinese variants:

- Home
- API reference, including legacy and binary command documentation
- Information
- Setup
- Device Control
- Troubleshooting
- XIM guide
- Discord redirect
- MDX documentation

The refresh must preserve these interactive owners:

- `MakcuConnectionProvider`: Web Serial discovery, connection state, normal/flash mode, baud detection, command transport, and disconnect
- Device information and device test displays
- Firmware selection, download, validation, and flashing controls
- Serial terminal input and output
- Discord member/presence fetch and rotating member display
- Search, language selection, theme selection, audio playback, and audio mute
- Section navigation, mobile drawer, page table of contents, and anchor links

## Visual system

### Foundation

- Dark graphite background with restrained lime radial light and a technical grid
- Opaque navigation and panels so content remains readable without the old full-screen space video
- One lime accent for status, focus, active navigation, and primary actions
- Neutral white text, muted grey labels, amber warnings, and red faults
- Thin borders, clipped corner details, controlled glow, and compact spacing

### Brand

- Replace the handwritten wordmark presentation with a custom geometric MAKCU wordmark built from MAKCU-owned text styling
- Keep all product naming and metadata strictly MAKCU
- Use the existing MAKCU device photograph as the hero artwork
- Do not include reference-product logos, assets, names, signatures, or implementation terminology

### Layout

- Desktop: compact sticky command bar, wide hero, persistent documentation index, and structured content panels
- Mobile: scrollable top navigation, compact connection controls, single-column hero, single-column cards, and horizontally scrollable community rows
- Long API and guide pages retain readable document widths and sticky local navigation where space allows

## Migration stages

### Stage 0 - Baseline

- Confirm repository, remote, branch, revision, and Pages selector
- Install the locked dependency graph
- Run the unchanged production build
- Capture the current public site for comparison

Exit gate: unchanged `pnpm build` succeeds.

### Stage 1 - Shell and tokens

- Replace the space-video backdrop with a lightweight CSS control-surface backdrop
- Establish MAKCU colour, type, panel, focus, scrollbar, and motion tokens
- Restyle the navigation, product wordmark, global content shell, buttons, cards, and footer

Exit gate: all static routes build and shared controls remain present.

### Stage 2 - Home

- Add a product-first hero using the existing MAKCU board image
- Surface Device Control and Setup as primary actions
- Present existing community and compatibility data as instrument panels
- Keep the complete home navigation index and Discord member rotation

Exit gate: live Discord data can still populate and all home links retain locale-aware destinations.

### Stage 3 - Documentation and device workflows

- Apply the panel system to sidebars, sections, cards, forms, tables, tabs, terminal, firmware controls, and alerts
- Preserve component logic and state ownership; visual changes must not move protocol or flashing behaviour
- Verify desktop and mobile route rendering

Exit gate: every English and Chinese route exports, has no page-level horizontal overflow, and exposes its expected headings and controls.

### Stage 4 - Publication

- Audit the public output for reference-product naming or assets
- Run lint, production build, route/link checks, and rendered desktop/mobile checks
- Review the complete diff and stage only refresh files
- Publish through the confirmed repository workflow
- Verify the Pages job and both public hostnames before calling the migration live

## Validation matrix

| Area | Required proof |
| --- | --- |
| Source | `git diff --check`, scoped branding search, preserved route inventory |
| Types/build | `pnpm lint`, `pnpm build` |
| Static output | All 22 generated pages present in `out` |
| Desktop render | Home, API, setup, and device control at 1440 x 1000 |
| Mobile render | Home, API, setup, and device control at 390 x 844 |
| Navigation | Locale-aware primary links and anchors resolve in exported output |
| Device UI | Connect button, status label, device control sections, firmware section ownership, and terminal ownership remain in source/output |
| Public branding | No reference-product name, domain, logo, or asset in rendered HTML, JS, CSS, or public files |
| Delivery | Published commit matches the Pages build and live response |

## Rollback

The starting revision is the rollback point. If the published build, static routes, or device workflow shell regresses, revert the refresh commit on `main` and allow the same Pages workflow to redeploy the previous export.

## Implementation record

Completed on 2026-08-07 on branch `agent/makcu-visual-refresh`.

- Stage 0 passed: the unchanged dependency lock installed and the starting production export generated all 22 static pages.
- Stage 1 passed: the space-video shell and handwritten font path were replaced with the MAKCU control-surface backdrop, wordmark, navigation, panel, card, button, form, code, and footer system.
- Stage 2 passed: the home page now has a device-first responsive hero, direct Device Control and Setup actions, existing MAKCU community proof, the complete navigation index, and the existing live Discord member rotation.
- Stage 3 passed: the shared system applies to all guide, API, device, firmware, terminal, and troubleshooting surfaces without editing protocol, connection, flashing, parsing, or terminal owners.
- Retired assets: `public/background.mp4` (37,286,429 bytes) and `fonts/Road-Rage.otf` (341,760 bytes).
- Production build: passed; all 22 static pages generated.
- Lint: passed with zero errors; 57 pre-existing warnings remain in unchanged application/device code.
- Route test: 19 public route URLs returned HTTP 200 locally.
- Link test: 537 generated local links resolved with zero failures.
- Responsive proof: desktop renders passed at 1440 x 1000. At an emulated 390 px viewport, home and API both measured `scrollWidth === clientWidth === 390`.
- Public branding audit: no reference-product name, hostname, product sub-brand, old video reference, or old font reference was found in the source or generated public output.
- Hardware boundary: no physical MAKCU was connected during this visual migration, so Web Serial transport and physical flashing were preserved by source ownership and build proof, not exercised against a device.
