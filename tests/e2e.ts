import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";

const browser = await puppeteer.launch();
const page = await browser.newPage();

await page.goto("http://localhost:8000");

await page.screenshot({ path: "./assets/deno-with-react.png" });

await browser.close();