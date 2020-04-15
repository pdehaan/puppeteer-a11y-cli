#!/usr/bin/env node

const fs = require("fs").promises;

const { AxePuppeteer } = require("axe-puppeteer");
const puppeteer = require("puppeteer");

const args = process.argv.slice(2);

if (args.length > 0) {
  main(args);
} else {
  console.error("USAGE: `node index [url1] [url2]`");
  process.exit(1);
}

async function main(uris) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setBypassCSP(true);

  for (const uri of uris) {
    await page.goto(uri);
    const results = await new AxePuppeteer(page).analyze();
    const hostname = new URL(uri).hostname;
    await fs.writeFile(
      `./reports/${hostname}.json`,
      JSON.stringify(results, null, 2)
    );
  }

  await page.close();
  await browser.close();
}
