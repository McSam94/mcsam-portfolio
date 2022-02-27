import "../styles/globals.css";
import * as React from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import I18nProvider from "next-translate/I18nProvider";
import useTranslation from "next-translate/useTranslation";

interface ProviderProps {
  children: React.ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  const { lang } = useTranslation();

  return (
    <ThemeProvider attribute="class">
      <I18nProvider lang={lang}>{children}</I18nProvider>
    </ThemeProvider>
  );
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
