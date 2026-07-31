import CryptoJS from "crypto-js";
import type { FlashOptions } from "esptool-js";

type FlashProgressCallback = (
  fileIndex: number,
  written: number,
  total: number,
) => void;

export const calculateEspImageMd5 = (image: Uint8Array): string =>
  CryptoJS.MD5(CryptoJS.lib.WordArray.create(image)).toString();

export const createSingleImageFlashOptions = (
  buffer: ArrayBuffer,
  reportProgress?: FlashProgressCallback,
): FlashOptions => ({
  fileArray: [
    {
      data: new Uint8Array(buffer),
      address: 0x0,
    },
  ],
  eraseAll: false,
  compress: true,
  flashMode: "keep",
  flashFreq: "keep",
  flashSize: "keep",
  calculateMD5Hash: calculateEspImageMd5,
  ...(reportProgress ? { reportProgress } : {}),
});
