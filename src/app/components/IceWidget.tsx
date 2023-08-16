import Head from 'next/head';
import {useState} from 'react';
const IceWidget = () => {
 
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0"
        />
        <title>ice: Decentralized Future</title>
        <script src="https://ice-production.b-cdn.net/website-widget/external.js"></script>
      </Head>
      <body className="body">
        <div id="container"></div>
        <script
          dangerouslySetInnerHTML={{
            __html: "initWidget('container', 'http://localhost:3000/predictoLogo.png', 'Wenaron')",
          }}
        />
      </body>
    </>
  );
};

export default IceWidget;
