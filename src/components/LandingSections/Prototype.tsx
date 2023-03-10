import {
  Box,
  Text,
  Heading,
  Image,
  Flex,
} from "@chakra-ui/react"
import React from "react"

export default function Prototype() {
  return (
    <Box>
      <Flex
        justifyContent="center"
        direction="column"
        margin="2rem auto"
        py="5%"
        color="white"
        w={["", "", "80%"]}
      >
        <Text
          fontWeight="bold"
          marginBottom={3}
          fontSize={["xl", "2xl"]}
          textAlign="center"
        >
          PAPER PROTOTYPE USABILITY TEST
        </Text>
        <Text
          fontSize={["md", "lg"]}
          marginBottom="2rem"
        >
          We iterated our wireframe design by
          conducting informal usability testing
          with the low-fidelity prototype. Because
          the timeframe of the hackathon was
          short, only a few participants like our
          roommates provided feedbacks on
          error-prevention methods, accessibility,
          and discoverability of the UI.
        </Text>
      </Flex>
      <Flex
        gap={10}
        // margin="4rem auto"
        justify="center"
        alignItems="center"
        flexWrap="wrap"
      >
        <Box
          as="img"
          src="/lowf.png"
          w="100%"
          h="auto"
          bg="gray.400"
        />
        <br />
        <Box
          as="img"
          src="/m1.png"
          w={["100%", "", "", "300px"]}
        />
        <Box
          as="img"
          src="/m3.png"
          w={["100%", "", "", "300px"]}
        />
        <Box
          as="img"
          src="/mobile.png"
          w={["100%", "", "", "300px"]}
        />
      </Flex>
    </Box>
  )
}
