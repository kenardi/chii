import { serverUrl, cdn } from './config';
import DevtoolsFrame from './DevtoolsFrame';
import createUrl from 'licia/createUrl';
import ready from 'licia/ready';

export default function () {
  let devtoolsUrl = `${serverUrl}front_end/chii_app.html`;
  if (cdn) {
    devtoolsUrl = createUrl(
      `
    <!DOCTYPE html>
    <html lang="en">
    <meta charset="utf-8">
    <title>DevTools</title>
    <style>
      @media (prefers-color-scheme: dark) {
        body {
          background-color: rgb(41 42 45);
        }
      }
    </style>
    <meta name="referrer" content="no-referrer">
    <meta name="referrer" content="no-referrer">
    <script>
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      if (isSafari) {
        document.write('<scr' + 'ipt src="${cdn}front_end/third_party/polyfill/customElement.js"></scr' + 'ipt>');
      }
      if (!window.requestIdleCallback) {
        document.write('<scr' + 'ipt src="${cdn}front_end/third_party/polyfill/requestIdleCallback.js"></scr' + 'ipt>');
      }
    </script>
    <script type="module" src="${cdn}front_end/entrypoints/chii_app/chii_app.js"></script>
    <body class="undocked" id="-blink-dev-tools">
    `,
      {
        type: 'text/html',
      }
    );
  }
  const devtoolsFrame = new DevtoolsFrame();
  if (document.body) {
    devtoolsFrame.attach(devtoolsUrl);
  } else {
    ready(() => devtoolsFrame.attach(devtoolsUrl));
  }
}
