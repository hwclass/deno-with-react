import { React, ReactDOMServer } from "./deps.ts";
import { serve } from "https://deno.land/x/sift@0.6.0/mod.ts";
import { emit } from "https://deno.land/x/emit/mod.ts";

import App from './app.tsx'

const assetsDir = './assets/'

const url = new URL("./client.tsx", import.meta.url);
const result = await emit(url, { bundle: "module" });

const generateAssetResponse = async (
  headers: ResponseInit
): Promise<Response> => {
  const file = result[url.href] || "";
  return new Response(file, headers);
};

const assetsList = [{
  fileName: 'client.js',
  headers: {
    "Content-Type": "application/javascript"
  }
}]

async function assets(request: Request) {
  const pathname = new URL(request.url).pathname;
  for (let file of assetsList) {
    if (pathname.endsWith(file.fileName)) {
      return generateAssetResponse({
        headers: file.headers,
      });
    }
  }
}

serve({
  "/": home,
  '/assets/:path': assets
});

// TODO 1: Replace with a random data generator
const list = [
  { name: "Name 1", description: "Description 1" },
  { name: "Name 2", description: "Description 2", link: "google.com" },
  { name: "Name 3", description: "Description 3" },
  { name: "Name 4", description: "Description 4", link: "yahoo.com", additional: 'extra' },
];

function home() {
  try {
    return new Response(
      `
      <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="https://unpkg.com/nes.css@2.3.0/css/nes.min.css" crossorigin="anonymous">
          <title>Document</title>
        </head>
        <body>
          <div id="root">${(ReactDOMServer as any).renderToString(<App list={list} />)}</div>
          <script  src="http://localhost:8000/assets/client.js" defer></script>
        </body>
      </html>
    `,
      {
        headers: {
          "Content-Type": "text/html; charset=UTF-8",
        },
      },
    );
  } catch (error) {
    console.error(error);
  }
}
