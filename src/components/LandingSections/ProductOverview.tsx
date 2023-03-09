import {
    Box,
    Image,
    Flex,
    Heading,
    Text,
  } from "@chakra-ui/react"
  import React from "react"
  
  export default function ProductOverview ()  {
    return (
      <Box>
        <Box
          margin={{
            base: "2rem auto",
            lg: "5rem auto",
          }}
        >
          <Flex
            gap={{ base: 0, lg: 5 }}
            flexWrap="wrap"
          >
            <Box
              maxWidth={{ base: "100%", lg: "50%" }}
              height="150px"
              bg="gray.400"
              marginBottom={{ base: "2rem", lg: 0 }}
            />
            <Box
              width={{ base: "100%", lg: "50%" }}
            >
              <Text
                fontWeight="700"
                fontSize={{ base: "lg", lg: "md" }}
                marginBottom={{
                  base: "1rem",
                  lg: "4",
                }}
              >
                Product Overview{" "}
              </Text>
              <Box width="100%">
                <Text fontWeight="500">
                  Send currencies to another
                  currency address . Receive
                  currency from another currency
                  address . Manage your DAO Tokens .
                  Convert between currencies through
                  the in-app ShapeShift integration
                  . Pair from or to another device's
                  Bitsharker wallet so that you can
                  access that same wallet across all
                  devices (mobile, desktop, tablet,
                  or browser extension format) .
                  Transfer funds from a paper wallet
                  / private key, including encrypted
                  paper wallets . Send to contract
                  addresses . Use your device's
                  camera to scan addresses in QR
                  code form (mobile only) for
                  sending and receiving bitcoin and
                  ether, as well as pairing wallets
                  and . transferring funds from a
                  paper wallet
                </Text>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>
    )
  }