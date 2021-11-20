import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ContextProvider } from "../context/context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  );
}

export default MyApp;
