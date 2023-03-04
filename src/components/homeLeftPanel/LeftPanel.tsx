import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react"
import AppOptionCard from "./AppOptionCard"

export default function LeftPanel() {
  const appOptionsData = [
    "Settings",
    "View Source Code",
    "Github",
  ]

  const mappedAppOptions = appOptionsData.map(
    (options, index) => {
      return (
        <AppOptionCard
          key={index}
          title={options}
        />
      )
    }
  )

  return (
    <Box
      w="20%"
      py="16px"
      pos="fixed"
      height="100vh"
    >
      <VStack spacing="16px" pb="8px">
        // user profile card
        <Flex
          flexDirection="column"
          alignItems="center"
          pt="32px"
          w="100%"
        >
          <Box
            bg="yellow"
            w="150px"
            h="150px"
            rounded="full"
          />
          <Flex
            alignItems="center"
            direction="column"
            gap="4px"
            py="16px"
            w="100%"
          >
            <Heading
              fontWeight="bold"
              fontSize="lg"
            >
              Username
            </Heading>
            <Text
              fontWeight="semibold"
              fontSize="sm"
              fontStyle="italic"
            >
              #Account Hash
            </Text>
            <Button
              bg="green.300"
              textColor="white"
              fontSize="xl"
              w="60%"
              mt="8px"
            >
              View Profile
            </Button>
          </Flex>
        </Flex>
        <Divider />
        <Box w="100%" px="32px" pt="8px">
          {mappedAppOptions}
        </Box>
      </VStack>
    </Box>
  )
}
