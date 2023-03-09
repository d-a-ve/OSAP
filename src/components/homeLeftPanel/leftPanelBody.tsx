import {
  Box,
  Button,
  Text,
  Divider,
  Flex,
  Heading,
  VStack,
} from "@chakra-ui/react"
import { useContext } from "react"
import { GlobalContext } from "../../contexts/global"

export default function LeftPanelBody(prop: {
  mappedAppOptions: any
}) {
  const { address, connectWallet }: any =
    useContext(GlobalContext)

  const formatted = address
    ? address.slice(0, 6) +
      "..." +
      address.slice(address.length, 2)
    : "not connected"

  return (
    <>
      <VStack spacing="16px" pb="8px">
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
              {formatted}
            </Text>
            <Button
              bg={address ? "green.300" : "gray"}
              _hover={{
                backgroundColor: address
                  ? "green.300"
                  : "gray",
              }}
              color={
                address ? "white" : "gray.400"
              }
              fontSize="xl"
              w="60%"
              mt="8px"
              disabled={address ? false : true}
              onClick={
                address ? null : connectWallet
              }
            >
              {!address
                ? "Sign in"
                : "Mint profile"}
            </Button>
          </Flex>
        </Flex>
        <Divider />
        <Box w="100%" px="32px" pt="8px">
          {prop.mappedAppOptions}
        </Box>
      </VStack>
    </>
  )
}
