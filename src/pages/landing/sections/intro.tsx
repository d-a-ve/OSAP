import {
  Box,
  Flex,
  Text,
  Image,
  Heading,
} from "@chakra-ui/react"
import React from "react"
import { Header } from "../../../components/Header"

export const Intro = () => {
  return (
    <Box h="100vh" bg="#EEF3F7">
      <Header />
      <Flex
        h="100vh"
        justify="center"
        align="center"
      >
        <Box
          maxWidth="700px"
          // transition="all 10s ease-in-out"
          _
          as="a"
          href="#"
          sx={{
            display: "inline-block",
            position: "relative",
            textDecoration: "none",
            transition: "all 5s",
            "&:hover": {
              textDecoration: "none",
              "&::after": {
                content: '""',
                display: "block",
                height: "2px",
                width: "100%",
                backgroundImage:
                  "linear-gradient(to right, black, green)",
                position: "absolute",
                bottom: "-4px",
                left: 0,
                transition: "width 10s ",
              },
            },
          }}
        >
          <Image
            src="OSAP.svg"
            alt="OSAP logo"
            htmlWidth="100%"
            htmlHeight="auto"
          />
        </Box>
      </Flex>
    </Box>
  )
}
