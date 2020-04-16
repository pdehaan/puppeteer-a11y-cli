# puppeteer-a11y-cli

## USAGE

```sh
npx pdehaan/puppeteer-a11y-cli https://mozilla.org
```

**NOTE:** This isn't super fast or efficient since running via npx will cause the Chromium binary to be downloaded for each execution.

By default, reports are saved to a ./reports/ folder (which will be created if it doesn't exist). If you want to change the output folder or set it to the current directory, you can set the `REPORT_DIR` environment variable, like so:

```sh
REPORT_DIR="./" npx pdehaan/puppeteer-a11y-cli https://mozilla.org
```
