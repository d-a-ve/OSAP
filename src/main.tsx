import React from "react"
import ReactDOM from "react-dom/client"
import { ChakraProvider } from "@chakra-ui/react"
import { ApolloProvider } from "@apollo/client";
import App from "./App"
import { GlobalContextProvider } from "./contexts/global"
import { apolloClient } from "./utils/apollo"


ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
).render(

  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <GlobalContextProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </GlobalContextProvider>
    </ApolloProvider>
  </React.StrictMode>
)

