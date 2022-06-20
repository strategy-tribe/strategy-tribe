import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons&display=swap"
          />
        </Head>
        <body>
          <Main />
          <div id="portal" />
          <div id="darkoverlay" />
          <div id="moremenu" />
          <NextScript />
        </body>
      </Html>
    );
  }
}
