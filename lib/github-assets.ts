export interface GithubAsset {
  name: string;
  path: string;
  size: number;
  lastModified: string;
  downloadUrl: string;
}

const GITHUB_CONTENTS_API =
  "https://api.github.com/repos/terrafirma2021/MAKCM_v2_files/contents";

interface GithubContentFile {
  name: string;
  path: string;
  size: number;
  download_url: string | null;
  type: string;
}

export async function listGithubAssets(extension: string): Promise<GithubAsset[]> {
  const response = await fetch(GITHUB_CONTENTS_API, {
    headers: {
      Accept: "application/vnd.github+json",
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub contents request failed: ${response.status}`);
  }

  const files = (await response.json()) as GithubContentFile[];
  const matchingFiles = files.filter(
    (file) =>
      file.type === "file" &&
      file.name.endsWith(extension) &&
      !!file.download_url,
  );

  return matchingFiles.map((file) => ({
    name: file.name,
    path: file.path,
    size: file.size,
    lastModified: "",
    downloadUrl: file.download_url || "",
  }));
}

export function listMakcuFirmwareFiles() {
  return listGithubAssets(".bin");
}
