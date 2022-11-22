import { React, ReactDOM } from "./deps.ts";
import { TListItem } from "./types.ts";

import App from './components/App.tsx'

declare global {
  var __INITIAL_STATE__: { list: TListItem[] };
}

const { list } = window.__INITIAL_STATE__ || { list: [] };

ReactDOM.hydrate(
  <App list={list} />,
  document.getElementById("root"),
);
