import "../styles/globals.css";
import "../lib/styles.ts";
import type { AppProps } from "next/app";
import "../lib/styles";
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

import fetch from "node-fetch"; // Use node-fetch here to allow SSR
import React from "react";
import Head from 'next/head'

const client = new ApolloClient({
  link: new HttpLink({ uri: "/api/graphql", fetch: fetch as any }),
  cache: new InMemoryCache(),
});
// This default export is required
export default function App({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    OneSignal.push(function () {
      OneSignal.init({
        appId: "541efcf0-e001-4f95-b7e0-a596777330fb",
        safari_web_id: "",
        notifyButton: {
          enable: true,
        },
        subdomainName: "scheduleinfo",
      });
    });
  }, []);
  return (
    <>
    <Head>
    <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>Next.js PWA Schedule App </title>

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/icon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/icon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  );
}
