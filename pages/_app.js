import { GlobalContextProvider } from "@/Store/globalContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <GlobalContextProvider>
      <Component {...pageProps} />
    </GlobalContextProvider>
  );
}
