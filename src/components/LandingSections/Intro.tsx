import {
  Box,
  Flex,
  Text,
  Image,
  Heading,
  Link,
  Button,
} from "@chakra-ui/react"

import { useRouter } from "next/router"
import { FaGithub } from "react-icons/fa"
import Header from "./Header"

export default function Intro() {
  const router = useRouter()

  function navigate(path: string) {
    router.push(path)
  }

  return (
    <Box h="100vh">
      {/* <Header /> */}
      <Box
        position={"fixed"}
        right={"10%"}
        top={"70px"}
      >
        <Link
          href="https://github.com/d-a-ve/OSAP"
          isExternal
        >
          <Button
            bg="gray"
            height={"55px"}
            color="white"
            mr={3}
            _hover={{
              background: "gray",
            }}
          >
            <FaGithub />
          </Button>
        </Link>

        <Button
          bg="green"
          height={"55px"}
          color="white"
          onClick={() => navigate("/Home")}
          _hover={{
            background: "green",
          }}
        >
          Go to App
        </Button>
      </Box>
      <Flex
        h="100vh"
        justify="center"
        align="center"
        bg="white"
      >
        <Box
          maxWidth="700px"
          // transition="all 10s ease-in-out"

          sx={{
            display: "inline-block",
            position: "relative",
          }}
        >
          <Image
            src="OSAP.svg"
            alt="OSAP logo"
            w={["70%", "70%", "80%", "90%"]}
            mx="auto"
          />
          <Text
            fontWeight={900}
            fontSize={["lg", "lg", "2xl"]}
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
