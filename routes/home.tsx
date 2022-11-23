import { React, ReactDOMServer } from "../deps.ts";

import App from '../components/App.tsx'
import { TListItem } from '../types.ts'

import { RANDOM_SEED_DATA } from '../seed/data.ts'

const INITIAL_DATA: TListItem[] = RANDOM_SEED_DATA

async function home(req: Request): Promise<Response> {
  const { method } = req;

  let list: TListItem[] = [];

  if (method == 'GET') {
    list = INITIAL_DATA;
  } else if (method == 'POST') {
    // Nice to Have: That would be nice to parse POST request to generate rows over HTTP, too.
    const body = await req.text();
    list = JSON.parse(JSON.stringify(body))
  }

  try {
    return new Response(
      `
        <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://unpkg.com/nes.css@2.3.0/css/nes.min.css" crossorigin="anonymous">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
            <link href="/assets/style.css" rel="stylesheet">
            <title>Deno + React Example</title>
            <script>
              window.__INITIAL_STATE__ = {"list": ${JSON.stringify(list)}};
            </script>
          </head>
          <body>
            <div id="root">
              ${ReactDOMServer.renderToString(<App list={list} />)}
            </div>
            <script type="module" src="http://localhost:8000/assets/client.js" defer></script>
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
    throw(error);
  }
}

export default home;