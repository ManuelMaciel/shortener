import * as React from 'react'
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document'
import { AppType } from 'next/dist/shared/lib/utils'

const MyDocument = () => {
  return (
    <Html lang="es">
      <Head>
        <meta name="theme-color"/>
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

MyDocument.getInitialProps = async (
  ctx: DocumentContext
): Promise<DocumentInitialProps> => {

  const originalRenderPage = ctx.renderPage
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (
        App: AppType | React.ComponentType
      ) =>
        function EnhanceApp(props) {
          return <App {...props} />
        },
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
  }
}

export default MyDocument
