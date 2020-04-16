#!/usr/bin/env node

const path = require("path");

const { AxePuppeteer } = require("axe-puppeteer");
const fs = require("fs-extra");
const puppeteer = require("puppeteer");

const args = process.argv.slice(2);

if (args.length > 0) {
  main(args);
} else {
  console.error("USAGE: `node index [url1] [url2]`");
  process.exit(1);
}

async function main(uris) {
  const reportDir = process.env.REPORT_DIR || "./reports";

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setBypassCSP(true);
  await fs.ensureDir(reportDir);

  for (const uri of uris) {
    await page.goto(uri);
    const results = await new AxePuppeteer(page).analyze();
    const hostname = new URL(uri).hostname;
    await fs.writeFile(
      path.join(reportDir, `${hostname}.json`),
      JSON.stringify(results, null, 2)
    );
  }

  await page.close();
  await browser.close();
}
