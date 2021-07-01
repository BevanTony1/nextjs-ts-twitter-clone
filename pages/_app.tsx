import { Provider } from 'next-auth/client'
import { ChakraProvider } from "@chakra-ui/react"
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Navbar from '../component/Navbar'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ChakraProvider>
      <Provider session={pageProps.session}>
        <Navbar />
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  )
}
export default MyApp
