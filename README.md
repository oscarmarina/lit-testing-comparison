## Overview

### Choosing a Test Framework for Lit

Lit has recently incorporated the WebdriverIO testing framework into its documentation. However, it's important to note that using this framework doesn't provide the same features as the Web Test Runner.

This repository demonstrates the use of both frameworks:

**Web Test Runner**

- Located in the `test/` directory
- Configured via `web-test-runner.config.js`

To run tests with Web Test Runner, use the command:

```bash
npm run test
```

**WebdriverIO**

- Located in the `testwdio/ directory`
- Configured via `wdio.conf.js`

To run tests with WebdriverIO, use the command:

```bash
npm run wdio
```

## Considerations When Using WebdriverIO

There are three key considerations to keep in mind when using WebdriverIO with Lit:

**WebdriverIO's browser-runner utilizes Vite**

- [WebdriverIO Browser Runner](https://webdriver.io/docs/runner/#browser-runner)

> This runner employs Vite to compile your test code and load it in the browser. It comes with presets for various component frameworks.

**Snapshot functionality is not available**

- [WebdriverIO Snapshot Issue](https://github.com/webdriverio/webdriverio/issues/9989)

**`@axe-core/webdriverio` is currently incompatible with Vite**

- [axe-core/webdriverio](https://www.npmjs.com/package/@axe-core/webdriverio)

```bash
   Error: Module "url" has been externalized for browser compatibility. Cannot access "url.pathToFileURL" in client code. See [Vite Troubleshooting Guide](https://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility) for more details.
```

<hr>

## Workarounds

The [Chai A11y aXe - open-wc](https://open-wc.org/docs/testing/chai-a11y-axe/#testing-chai-a11y-axe) testing library can be used with WebdriverIO.

However, you'll need to add the following plugin to your Vite configuration:

- Configured via `vite.config.js`
- [rollup-plugin-externalize-source-dependencies](https://github.com/oscarmarina/rollup-plugin-externalize-source-dependencies)

The [snapshots - semantic-dom-diff](https://open-wc.org/docs/testing/semantic-dom-diff/) utility is not usable as it requires a Web Test Runner.

```bash
Error: Could not detect test runner environment. Snapshots require either Web Test Runner with mocha, or Karma with mocha and karma mocha snapshot.
```

<hr>

## Next steps

In light of the fact that WebdriverIO uses Vite, and given that [Vitest](https://vitest.dev/guide/browser.html) is currently providing experimental support for browsers with WebdriverIO, along with the added benefit of snapshot functionality, I will be exploring the use of Vitest in this context.

- [lit-vitest-testing-comparison](https://github.com/oscarmarina/lit-vitest-testing-comparison)
