import {
  Box,
  Image,
  Heading,
  Flex,
  Text,
} from "@chakra-ui/react"
import React from "react"

export default function UiDesigns() {
  return (
    <Box color="white">
      <Box>
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Text
            margin="5rem auto"
            fontSize="1rem"
            fontWeight="bold"
          >
            LOGO DESIGN
          </Text>
          <Box
            as="img"
            src="/OSAP.svg"
            w="200px"
            h="200px"
            bg="gray.400"
          />
        </Flex>
      </Box>
      <Box>
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Text
            fontSize="1rem"
            fontWeight="bold"
            margin="5rem auto"
          >
            {" "}
            INITIAL UI DESIGN & WIREFRAME
          </Text>
          <Box
            as="img"
            src="/init.png"
            w="100%"
            h="auto"
            bg="gray.400"
          />
        </Flex>
      </Box>
    </Box>
  )
}
