import '../styles/globals.css'
import './styles.ts'
import type { AppProps } from 'next/app'
import './styles'
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import fetch from "node-fetch"; // Use node-fetch here to allow SSR

const client = new ApolloClient({
  link: new HttpLink({ uri: "/api/graphql", fetch: fetch as any }),
  cache: new InMemoryCache(),
});

// This default export is required
export default function App({ Component, pageProps }:AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
