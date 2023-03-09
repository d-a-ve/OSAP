import "../styles/global.css";
import { GlobalContextProvider } from '@/contexts/global'
import { ModalContextProvider } from '@/contexts/modal'
import { apolloClient } from '@/utils/apollo'
import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { createReactClient, LivepeerConfig, studioProvider, ThemeConfig } from "@livepeer/react";


const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY!,
  }),
});

const theme: ThemeConfig = {
  colors: {
    accent: 'rgb(0, 145, 255)',
    containerBorderColor: 'rgba(0, 145, 255, 0.9)',
  },
  fonts: {
    display: 'Inter',
  },
};


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <GlobalContextProvider>
        <ModalContextProvider>

          <ChakraProvider>        <LivepeerConfig client={livepeerClient} theme={theme}>
            <Component {...pageProps} />
          </LivepeerConfig>
          </ChakraProvider>

        </ModalContextProvider>
      </GlobalContextProvider>
    </ApolloProvider>
  )




}
