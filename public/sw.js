if (!self.define) {
  let e,
    n = {};
  const s = (s, r) => (
    (s = new URL(s + ".js", r).href),
    n[s] ||
      new Promise((n) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = s), (e.onload = n), document.head.appendChild(e);
        } else (e = s), importScripts(s), n();
      }).then(() => {
        let e = n[s];
        if (!e) throw new Error(`Module ${s} didn’t register its module`);
        return e;
      })
  );
  self.define = (r, i) => {
    const a =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (n[a]) return;
    let c = {};
    const t = (e) => s(e, a),
      l = { module: { uri: a }, exports: c, require: t };
    n[a] = Promise.all(r.map((e) => l[e] || t(e))).then((e) => (i(...e), c));
  };
}
define(["./workbox-22294e6b"], function (e) {
  "use strict";
  importScripts(
    "worker-cNKSnrTl42E9wkxinnMlZ.js",
    "fallback-cNKSnrTl42E9wkxinnMlZ.js"
  ),
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
          url: "/_next/static/cNKSnrTl42E9wkxinnMlZ/_buildManifest.js",
          revision: "cNKSnrTl42E9wkxinnMlZ",
        },
        {
          url: "/_next/static/cNKSnrTl42E9wkxinnMlZ/_ssgManifest.js",
          revision: "cNKSnrTl42E9wkxinnMlZ",
        },
        {
          url: "/_next/static/chunks/450-bdd06e546ce6c296f550.js",
          revision: "cNKSnrTl42E9wkxinnMlZ",
        },
        {
          url: "/_next/static/chunks/66eeed8d-7519faeb8bf221b23098.js",
          revision: "cNKSnrTl42E9wkxinnMlZ",
        },
        {
          url: "/_next/static/chunks/75fc9c18-5c1929f66343f0a636cd.js",
          revision: "cNKSnrTl42E9wkxinnMlZ",
        },
        {
          url: "/_next/static/chunks/cb1608f2-30d7a2fa307797a32f40.js",
          revision: "cNKSnrTl42E9wkxinnMlZ",
        },
        {
          url: "/_next/static/chunks/framework-2191d16384373197bc0a.js",
          revision: "cNKSnrTl42E9wkxinnMlZ",
        },
        {
          url: "/_next/static/chunks/main-877ccd2043644fe38ff3.js",
          revision: "cNKSnrTl42E9wkxinnMlZ",
        },
        {
          url: "/_next/static/chunks/pages/_app-73c2461ab6c9e456404c.js",
          revision: "cNKSnrTl42E9wkxinnMlZ",
        },
        {
          url: "/_next/static/chunks/pages/_error-737a04e9a0da63c9d162.js",
          revision: "cNKSnrTl42E9wkxinnMlZ",
        },
        {
          url: "/_next/static/chunks/pages/_offline-e86ca6b58e359807d275.js",
          revision: "cNKSnrTl42E9wkxinnMlZ",
        },
        {
          url: "/_next/static/chunks/pages/index-3d417942f947d474cdf5.js",
          revision: "cNKSnrTl42E9wkxinnMlZ",
        },
        {
          url: "/_next/static/chunks/polyfills-a40ef1678bae11e696dba45124eadd70.js",
          revision: "cNKSnrTl42E9wkxinnMlZ",
        },
        {
          url: "/_next/static/chunks/webpack-613fd858cdb9cf2af3be.js",
          revision: "cNKSnrTl42E9wkxinnMlZ",
        },
        {
          url: "/_next/static/css/c7b34796969fe536635b.css",
          revision: "cNKSnrTl42E9wkxinnMlZ",
        },
        { url: "/_offline", revision: "cNKSnrTl42E9wkxinnMlZ" },
        {
          url: "/icons/icon-16x16.png",
          revision: "d24288883f33f1f576726d757d243956",
        },
        {
          url: "/icons/icon-256x256.png",
          revision: "3d7773f49ad309c0540ca9a38e6ca18a",
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
        { url: "/indexdb.js", revision: "b960ae9661869a85f56eb7de2f912b4f" },
        { url: "/manifest.json", revision: "50b377b91493fbc66507cdf7e4f6a7aa" },
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
              response: n,
              event: s,
              state: r,
            }) =>
              n && "opaqueredirect" === n.type
                ? new Response(n.body, {
                    status: 200,
                    statusText: "OK",
                    headers: n.headers,
                  })
                : n,
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
        const n = e.pathname;
        return !n.startsWith("/api/auth/") && !!n.startsWith("/api/");
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
