import { React, ReactDOM } from "./deps.ts";

import { TList } from "./types.ts";

declare global {
  var __INITIAL_STATE__: { list: TList };
}

import App from './app.tsx'

const { list } = window.__INITIAL_STATE__ || { list: [] };

hydrateRoot(
  <App list={list} />,
  document.getElementById("root"),
);
