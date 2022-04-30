import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import "normalize.css/normalize.css"
import "../styles/globals.css"
import type { ReactElement, ReactNode } from "react"
import type { NextPage } from "next"
import SessionWrapper from "../components/SessionWrapper"
import Layout from "../components/layout"

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithAuthAndLayout = AppProps & {
  Component: NextPageWithLayout & { auth?: boolean }
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithAuthAndLayout) {
  return (
    <SessionProvider session={session}>
      <Layout>
        {Component.auth ? (
          // If Component has auth property will render loading page while checking session
          <SessionWrapper>
            <Component {...pageProps} />
          </SessionWrapper>
        ) : (
          // Render Component without loading page
          <Component {...pageProps} />
        )}
      </Layout>
    </SessionProvider>
  )
}

export default MyApp
