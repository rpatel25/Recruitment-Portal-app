// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>LookoutAI</title>
        <link rel="icon" href="/icons/logo_symbol.svg" />

        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');
        </style>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
