export function getBasePath() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;
}

export function withBasePath(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getBasePath()}${normalizedPath}`;
}
