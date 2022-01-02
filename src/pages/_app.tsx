import { globalCss } from '@/stitches.config'
import type { AppProps } from 'next/app'

const globalStyles = globalCss({
  '*': {
    padding: 0,
    margin: 0,
    boxSizing: 'border-box',
  },
  body: {
    background: 'white',
    color: '#202020',
    fontFamily: `'Noto Sans JP', sans-serif`,
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles()

  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
