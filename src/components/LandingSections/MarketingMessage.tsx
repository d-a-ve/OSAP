import {
  Box,
  Text,
  Heading,
  Flex,
  Image,
} from "@chakra-ui/react"
import React from "react"

export default function MarketingMsg() {
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
          {/* <Text

            marginBottom="1.5rem"
            fontWeight="bold"
          >
            OSAP
          </Text> */}
          <br />
          <Text
            fontSize={["xl", "2xl"]}
            marginBottom="2rem"
            lineHeight={1.7}
            color="white"
          >
            Unlock the full potential of
            Africa&apos;s diverse and dynamic
            population, and drive positive change
            across the continent
          </Text>
          <Text
            fontSize="sm"
            marginBottom="2rem"
            color="white"
          >
            Africa has a population of over 1.3
            billion people,with over 3,000
            distinct ethnic groups and more than
            2,000 languages spoken, As such there
            is always a need for a platform that
            can bring together people from
            different backgrounds and provide a
            space for cross-cultural communication
            and collaboration. OSAP (Open source
            African progress) is a gamified social
            media where individuals,
            organisations, and communities can
            meet, share ideas, and work towards
            solutions that are inspired by
            challenges peculiar in our world
          </Text>
        </Box>
        <Flex
          flexWrap="wrap"
          gap={10}
          justifyContent={["center", "flex-end"]}
          alignItems="center"
        >
          <Box w="200px" h="200px" bg="green" />
          <Box w="200px" h="200px" bg="yellow" />
          <Box w="200px" h="200px" bg="yellow" />
          <Box w="200px" h="200px" bg="yellow" />
        </Flex>
      </Flex>
    </Box>
  )
}
