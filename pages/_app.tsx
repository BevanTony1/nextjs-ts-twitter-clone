import { Provider } from 'next-auth/client'
import { ChakraProvider } from "@chakra-ui/react"
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import useSWR, { SWRConfig } from 'swr'

const fetcher = (...args: any) => fetch(args).then(res => res.json())

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ChakraProvider>
      <SWRConfig value={{ fetcher }}>
        <Provider session={pageProps.session}>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </Provider>
      </SWRConfig>
    </ChakraProvider>
  )
}
export default MyApp
