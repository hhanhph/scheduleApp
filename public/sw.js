if (!self.define) {
  let e,
    s = {};
  const n = (n, t) => (
    (n = new URL(n + ".js", t).href),
    s[n] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = n), (e.onload = s), document.head.appendChild(e);
        } else (e = n), importScripts(n), s();
      }).then(() => {
        let e = s[n];
        if (!e) throw new Error(`Module ${n} didn’t register its module`);
        return e;
      })
  );
  self.define = (t, r) => {
    const c =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[c]) return;
    let a = {};
    const i = (e) => n(e, c),
      o = { module: { uri: c }, exports: a, require: i };
    s[c] = Promise.all(t.map((e) => o[e] || i(e))).then((e) => (r(...e), a));
  };
}
define(["./workbox-22294e6b"], function (e) {
  "use strict";
  importScripts("fallback-D-0dm4XeF90qsTsVcB35t.js"),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/OneSignalSDKUpdaterWorker.js",
          revision: "ebb63ca15bba16b550232b0b0f66c726",
        },
        {
          url: "/OneSignalSDKWorker.js",
          revision: "ebb63ca15bba16b550232b0b0f66c726",
        },
        {
          url: "/_next/static/D-0dm4XeF90qsTsVcB35t/_buildManifest.js",
          revision: "D-0dm4XeF90qsTsVcB35t",
        },
        {
          url: "/_next/static/D-0dm4XeF90qsTsVcB35t/_ssgManifest.js",
          revision: "D-0dm4XeF90qsTsVcB35t",
        },
        {
          url: "/_next/static/chunks/450-bdd06e546ce6c296f550.js",
          revision: "D-0dm4XeF90qsTsVcB35t",
        },
        {
          url: "/_next/static/chunks/66eeed8d-7519faeb8bf221b23098.js",
          revision: "D-0dm4XeF90qsTsVcB35t",
        },
        {
          url: "/_next/static/chunks/75fc9c18-5c1929f66343f0a636cd.js",
          revision: "D-0dm4XeF90qsTsVcB35t",
        },
        {
          url: "/_next/static/chunks/cb1608f2-c8b1ecc70012a36c28c3.js",
          revision: "D-0dm4XeF90qsTsVcB35t",
        },
        {
          url: "/_next/static/chunks/framework-2191d16384373197bc0a.js",
          revision: "D-0dm4XeF90qsTsVcB35t",
        },
        {
          url: "/_next/static/chunks/main-877ccd2043644fe38ff3.js",
          revision: "D-0dm4XeF90qsTsVcB35t",
        },
        {
          url: "/_next/static/chunks/pages/_app-73c2461ab6c9e456404c.js",
          revision: "D-0dm4XeF90qsTsVcB35t",
        },
        {
          url: "/_next/static/chunks/pages/_error-737a04e9a0da63c9d162.js",
          revision: "D-0dm4XeF90qsTsVcB35t",
        },
        {
          url: "/_next/static/chunks/pages/_offline-e86ca6b58e359807d275.js",
          revision: "D-0dm4XeF90qsTsVcB35t",
        },
        {
          url: "/_next/static/chunks/pages/index-683f9f70777adb03d6bc.js",
          revision: "D-0dm4XeF90qsTsVcB35t",
        },
        {
          url: "/_next/static/chunks/polyfills-a40ef1678bae11e696dba45124eadd70.js",
          revision: "D-0dm4XeF90qsTsVcB35t",
        },
        {
          url: "/_next/static/chunks/webpack-613fd858cdb9cf2af3be.js",
          revision: "D-0dm4XeF90qsTsVcB35t",
        },
        {
          url: "/_next/static/css/c7b34796969fe536635b.css",
          revision: "D-0dm4XeF90qsTsVcB35t",
        },
        { url: "/_offline", revision: "D-0dm4XeF90qsTsVcB35t" },
        {
          url: "/icons/icon-16x16.png",
          revision: "d24288883f33f1f576726d757d243956",
        },
        {
          url: "/icons/icon-32x32.png",
          revision: "12eef112b350ee84478278149187781e",
        },
        {
          url: "/icons/icon-512x512.png",
          revision: "04e266cfae2dcee05ab5ab8f56cf5dc6",
        },
        {
          url: "/icons/icon-maskable-x128.png",
          revision: "937954099b71998b770a9dc91a932f63",
        },
        { url: "/indexdb.js", revision: "8c8f4f755699505321deb4c72deb5927" },
        { url: "/manifest.json", revision: "86080d8fb61a7253b25c27c9090db864" },
        {
          url: "/worker-5eX87Re9_ZZkalLZhQpXU.js.LICENSE.txt",
          revision: "0cf83b57a9f9f0b07d14b76975c60707",
        },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: n,
              state: t,
            }) =>
              s && "opaqueredirect" === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: "OK",
                    headers: s.headers,
                  })
                : s,
          },
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    );
});
