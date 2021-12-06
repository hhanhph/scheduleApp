if (!self.define) {
  let e,
    s = {};
  const n = (n, i) => (
    (n = new URL(n + ".js", i).href),
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
  self.define = (i, a) => {
    const r =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[r]) return;
    let t = {};
    const c = (e) => n(e, r),
      d = { module: { uri: r }, exports: t, require: c };
    s[r] = Promise.all(i.map((e) => d[e] || c(e))).then((e) => (a(...e), t));
  };
}
define(["./workbox-22294e6b"], function (e) {
  "use strict";
  importScripts(
    "worker-8ZqtidRk4J3DXmNequyZd.js",
    "fallback-8ZqtidRk4J3DXmNequyZd.js"
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
          url: "/_next/static/8ZqtidRk4J3DXmNequyZd/_buildManifest.js",
          revision: "8ZqtidRk4J3DXmNequyZd",
        },
        {
          url: "/_next/static/8ZqtidRk4J3DXmNequyZd/_ssgManifest.js",
          revision: "8ZqtidRk4J3DXmNequyZd",
        },
        {
          url: "/_next/static/chunks/66eeed8d-7519faeb8bf221b23098.js",
          revision: "8ZqtidRk4J3DXmNequyZd",
        },
        {
          url: "/_next/static/chunks/75fc9c18-5c1929f66343f0a636cd.js",
          revision: "8ZqtidRk4J3DXmNequyZd",
        },
        {
          url: "/_next/static/chunks/99-74fcbfd8dfd8a61669ae.js",
          revision: "8ZqtidRk4J3DXmNequyZd",
        },
        {
          url: "/_next/static/chunks/framework-2191d16384373197bc0a.js",
          revision: "8ZqtidRk4J3DXmNequyZd",
        },
        {
          url: "/_next/static/chunks/main-877ccd2043644fe38ff3.js",
          revision: "8ZqtidRk4J3DXmNequyZd",
        },
        {
          url: "/_next/static/chunks/pages/_app-856d90ba301169c9159e.js",
          revision: "8ZqtidRk4J3DXmNequyZd",
        },
        {
          url: "/_next/static/chunks/pages/_error-737a04e9a0da63c9d162.js",
          revision: "8ZqtidRk4J3DXmNequyZd",
        },
        {
          url: "/_next/static/chunks/pages/_offline-e86ca6b58e359807d275.js",
          revision: "8ZqtidRk4J3DXmNequyZd",
        },
        {
          url: "/_next/static/chunks/pages/index-808b769c3861672c157d.js",
          revision: "8ZqtidRk4J3DXmNequyZd",
        },
        {
          url: "/_next/static/chunks/polyfills-a40ef1678bae11e696dba45124eadd70.js",
          revision: "8ZqtidRk4J3DXmNequyZd",
        },
        {
          url: "/_next/static/chunks/webpack-613fd858cdb9cf2af3be.js",
          revision: "8ZqtidRk4J3DXmNequyZd",
        },
        {
          url: "/_next/static/css/c7b34796969fe536635b.css",
          revision: "8ZqtidRk4J3DXmNequyZd",
        },
        { url: "/_offline", revision: "8ZqtidRk4J3DXmNequyZd" },
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
        { url: "/idb.js", revision: "d494e3dae2fab6c9c7125f9ba47236ed" },
        { url: "/indexdb.js", revision: "9a6b398ec5fb8d3fec2c39f49263a597" },
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
              response: s,
              event: n,
              state: i,
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
