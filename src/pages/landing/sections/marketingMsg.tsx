import {
  Box,
  Text,
  Heading,
  Flex,
  Image,
} from "@chakra-ui/react"
import React from "react"

export const MarketingMsg = () => {
  return (
    <Box>
      <Flex
        flexDirection={["column", "row"]}
        alignItems={["center", "flex-start"]}
        justifyContent={[
          "center",
          "space-between",
        ]}
        textAlign={["center", "left"]}
      >
        <Box
          width={["90%", "40%"]}
          margin="3rem auto"
          fontWeight="500"
        >
          <Text
            as=""
            marginBottom="1.5rem"
            fontWeight="bold"
          >
            OSAP
          </Text>
          <Text
            fontSize={["xl", "2xl"]}
            marginBottom="2rem"
            lineHeight={1.7}
          >
            Trying to move towards a world of
            value movement and that people need an
            easy way to manage their
            cryptocurrencies and digital lives.
          </Text>
          <Text fontSize="sm" marginBottom="2rem">
            One of the challenges facing bitcoin’s
            adopters around the globe is storage.
            How exactly are you supposed to keep
            your bitcoins secure if you plan on
            keeping a significant amount in one
            wallet? Bitsharker Wallet is a hybrid
            platform which not only provide with
            web & mobile device, also enables you
            to transfer funds from a paper wallet
            or even a standard address through the
            Private Key, to your current
            Bitsharker Wallet.
          </Text>
        </Box>
        <Flex
          flexWrap="wrap"
          gap={10}
          justifyContent={["center", "flex-end"]}
          alignItems="center"
        >
          <Image
            src="/src/assets/opas-imgs.png"
            alt=""
          />
          <Image
            src="/src/assets/opas-imgs.png"
            alt=""
          />
          <Image
            src="/src/assets/opas-imgs.png"
            alt=""
          />
          <Image
            src="/src/assets/opas-imgs.png"
            alt=""
          />
        </Flex>
      </Flex>
    </Box>
  )
}
