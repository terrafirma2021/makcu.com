#!/usr/bin/env bash
set -euo pipefail

# Run the Makcu web app locally (WSL/Linux helper)
# Usage: ./run-dev.sh           -> pnpm run dev
#        ./run-dev.sh ssl       -> pnpm run dev-ssl (experimental https)

cd -- "$(dirname -- "$0")"

# Sanity check: package.json must exist
if [[ ! -f package.json ]]; then
  echo "[error] package.json not found. Run this script from the Website repo root." >&2
  exit 1
fi

# Node version hint (this project targets Node 24)
if ! command -v node >/dev/null 2>&1; then
  echo "[error] Node.js not on PATH. Install Node 24+ (e.g., via nvm) and retry." >&2
  exit 1
fi

# Install deps if missing or if local next binary not present
if [[ ! -d node_modules || ! -x node_modules/.bin/next ]]; then
  echo "[info] Installing dependencies (pnpm install)..."
  pnpm install
fi

SCRIPT="dev"
if [[ "${1:-}" == "ssl" ]]; then
  SCRIPT="dev-ssl"
fi

echo "[info] Starting pnpm run ${SCRIPT} ..."
pnpm run "${SCRIPT}"
