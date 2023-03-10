import {
  Box,
  Flex,
  Text,
  Image,
  Heading,
  Button,
} from "@chakra-ui/react"
import Header from "./Header"

export default function Intro() {
  return (
    <Box h="100vh">
      <Header />
      <Button
        bg="green"
        height={"55px"}
        color="white"
        position={"fixed"}
        right={"10%"}
        top={"70px"}
        _hover={{
          background: "green",
        }}
      >
        Go to App
      </Button>
      <Flex
        h="100vh"
        justify="center"
        align="center"
        bg="white"
      >
        <Box
          maxWidth="700px"
          // transition="all 10s ease-in-out"
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
          <Text
            fontWeight={900}
            fontSize={"2xl"}
            textAlign={"center"}
            color="black"
          >
            {" "}
            Open Source African Progress
          </Text>
        </Box>
      </Flex>
    </Box>
  )
}
