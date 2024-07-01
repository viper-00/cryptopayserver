import Document, { Html, Head, Main, NextScript } from 'next/document';
import { APP_NAME } from 'packages/constants';
import { DocumentHeadTags, documentGetInitialProps } from '@mui/material-nextjs/v13-pagesRouter';

export default function MyDocument(props: any) {
  return (
    <Html lang="en">
      <Head>
        <DocumentHeadTags {...props} />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </Head>
      <body style={{'backgroundColor': '#f8f9fa'}}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx: any) => {
  const finalProps = await documentGetInitialProps(ctx);
  return finalProps;
};

// class AppDocument extends Document {
//   render() {
//     return (
//       <Html lang="en">
//         <Head>
//           <meta charSet="utf-8" />
//           <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
//           <link
//             rel="icon"
//             // href={`${STATIC_ASSETS}/brand/logo.svg`}
//             type="image/svg+xml"
//           />
//           <link
//             rel="icon"
//             // href={`${STATIC_ASSETS}/brand/favicons/favicon.ico`}
//             type="image/x-icon"
//           />
//           <link
//             rel="shortcut icon"
//             // href={`${STATIC_ASSETS}/brand/favicons/favicon.ico`}
//           />
//           <link
//             rel="icon"
//             type="image/png"
//             sizes="32x32"
//             // href={`${STATIC_ASSETS}/brand/favicons/favicon-32x32.png`}
//           />
//           <link
//             rel="icon"
//             type="image/png"
//             sizes="16x16"
//             // href={`${STATIC_ASSETS}/brand/favicons/favicon-16x16.png`}
//           />
//           <meta name="theme-color" content="#ffffff" />
//           {/* <link rel="manifest" href="/manifest.json" /> */}
//           <meta name="apple-mobile-web-app-capable" content="yes" />
//           <meta name="mobile-web-app-capable" content="yes" />
//           <meta name="apple-mobile-web-app-status-bar-style" content="default" />
//           <meta name="apple-mobile-web-app-title" content={APP_NAME} />
//         </Head>
//         <body>
//           <Main />
//           <NextScript />
//         </body>
//       </Html>
//     );
//   }
// }

// export default AppDocument;
