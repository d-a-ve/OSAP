import {
  Box,
  Image,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react"
import React from "react"

export default function ProductOverview() {
  return (
    <Box pb={12}>
      <Box
        margin={{
          base: "2rem auto",
          lg: "5rem auto",
        }}
      >
        <Flex
          gap={{ base: 0, lg: 5 }}
          flexWrap="wrap"
          color="white"
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
                OSAP (Open source African
                progress) is a gamified social
                media where individuals,
                organisations, and communities can
                meet, share ideas, and work
                towards solutions that are
                inspired by challenges peculiar in
                our world
              </Text>
              <br />
              <Box ml={6} mb={12}>
                <ul>
                  <li>
                    Build Social Connections and
                    subscribe to ccProfiles{" "}
                    <span
                      style={{ color: "yellow" }}
                    >
                      (Cyberconnect
                      create-profile, twitter
                      auth, erc-721 )
                    </span>{" "}
                  </li>
                  <li>
                    Post about any pecuilar
                    challenge or theme for
                    discussion
                    <span
                      style={{ color: "yellow" }}
                    >
                      (Cyberconnect
                      create-essence)
                    </span>
                  </li>
                  <li>
                    Allow public (OSAP members),
                    or only subscribers to discuss
                    contibute solutions &nbsp;
                    <span
                      style={{ color: "yellow" }}
                    >
                      (Lit
                      access-control-conditions)
                    </span>
                  </li>
                  <li>
                    Members can vote on solutions
                    <span
                      style={{ color: "yellow" }}
                    >
                      ( Custom nft contract)
                    </span>
                  </li>
                  <li>
                    Contributors are challenged to
                    top the voting scoreboard,
                    perhaps to win weekly prizes
                    and sbt badges
                  </li>
                  <span
                    style={{ color: "yellow" }}
                  >
                    ( Custom nft contract)
                  </span>
                </ul>
              </Box>
              <br />
            </Box>
          </Box>
        </Flex>
      </Box>

      <Box
        as="img"
        src="/live.png"
        w="100%"
        h="auto"
        bg="gray.400"
      />
    </Box>
  )
}
