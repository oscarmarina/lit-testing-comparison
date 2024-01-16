/* eslint-disable implicit-arrow-linebreak */
import { defineConfig } from 'vite';
import { rollupPluginHTML as pluginHtml } from '@web/rollup-plugin-html';
import totalBundlesize from '@blockquote/rollup-plugin-total-bundlesize';
import externalizeSourceDependencies from '@blockquote/rollup-plugin-externalize-source-dependencies';

/**
 * https://vitejs.dev/config/
 * https://vite-rollup-plugins.patak.dev/
 */

export default defineConfig({
  plugins: [
    externalizeSourceDependencies([
      /* @web/test-runner-commands needs to establish a web-socket
       * connection. It expects a file to be served from the
       * @web/dev-server. So it should be ignored by Vite */
      '/__web-dev-server__web-socket.js',
    ]),
    pluginHtml(),
    totalBundlesize(),
  ],
  build: {
    target: ['chrome71'],
    outDir: 'dev',
    rollupOptions: {
      input: 'demo/*.html',
      output: {
        dir: 'dev/',
        format: 'es',
      },
    },
  },
});
