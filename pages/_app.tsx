import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import "normalize.css/normalize.css"
import "../styles/globals.css"
import SessionWrapper from "./api/auth/SessionWrapper"

interface CustomAppProps {
  Component: AppProps["Component"] & {
    auth?: boolean
  }
  pageProps: AppProps["pageProps"]
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: CustomAppProps) {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        // If Component has auth property will render loading page while checking session
        <SessionWrapper>
          <Component {...pageProps} />
        </SessionWrapper>
      ) : (
        // Render Component without loading page
        <Component {...pageProps} />
      )}
    </SessionProvider>
  )
}

export default MyApp
