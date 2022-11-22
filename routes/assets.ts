import { bundle } from "https://deno.land/x/emit/mod.ts";

import { TContentHeader } from '../types.ts'

const assetsList: TContentHeader[] = [{
  fileName: 'client.js',
  isBundle: true,
  headers: {
    "Content-Type": "application/javascript"
  }
}, {
  fileName: 'style.css',
  isBundle: false,
  headers: {
    "Content-Type": "text/css",
    "Cache-Control": "max-age=3600",
  }
}]

const url = new URL("../client.tsx", import.meta.url);
const result = await bundle(url);
const { code } = result

const generateAssetResponse = async (
  file,
  headers: ResponseInit
): Response => {
  if (file.isBundle) {
    const clientJS = code || "";
    return new Response(clientJS, headers);
  } else {
    try {
      const assetFile = await Deno.readFile(`./assets/${file.fileName}`);
      return new Response(assetFile, headers);
    } catch(err) {
      console.log(err)
    }
  }
};

export default async function assets (request: Request) {
  const pathname = new URL(request.url).pathname;
  for (const file of assetsList) {
    if (pathname.endsWith(file.fileName)) {
      return await generateAssetResponse(file, {
        headers: file.headers,
      });
    }
  }
}