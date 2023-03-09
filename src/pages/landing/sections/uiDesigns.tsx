import {
  Box,
  Image,
  Heading,
  Flex,
  Text,
} from "@chakra-ui/react"
import React from "react"

export const UiDesigns = () => {
  return (
    <Box>
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
          <Image
            src="src\assets\UiDesigns.jpg"
            alt=""
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
          <Image
            src="src\assets\UiDesigns.jpg"
            alt=""
          />
        </Flex>
      </Box>
    </Box>
  )
}
