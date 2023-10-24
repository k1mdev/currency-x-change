import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Suspense } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary fallback={<p>An Error has occured</p>}>
      <Suspense fallback={<p>NextJs Rocks</p>}>
        <Component {...pageProps} />
      </Suspense>
    </ErrorBoundary>
  )
}
