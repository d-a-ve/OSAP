import "../styles/global.css";
import { GlobalContextProvider } from '@/contexts/global'
import { ModalContextProvider } from '@/contexts/modal'
import { apolloClient } from '@/utils/apollo'
import { ApolloProvider } from '@apollo/client'
import { ChakraProvider, Flex } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { createReactClient, LivepeerConfig, studioProvider, ThemeConfig } from "@livepeer/react";
import LeftPanel from "@/components/homeLeftPanel/LeftPanel";
import RightPanel from "@/components/homeRightPanel/RightPanel";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";


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
  const router = useRouter();



  return (
    <ApolloProvider client={apolloClient}>
      <GlobalContextProvider>
        <ModalContextProvider>
          <ChakraProvider>        <LivepeerConfig client={livepeerClient} theme={theme}>
            {
              router.pathname !== '/' &&     router.pathname !== '/welcome'  ?
                <Layout sides={true}>
                  <Component {...pageProps} />
                </Layout> :

                <Component {...pageProps} />
            }

          </LivepeerConfig>
          </ChakraProvider>

        </ModalContextProvider>
      </GlobalContextProvider>
    </ApolloProvider>
  )

}


