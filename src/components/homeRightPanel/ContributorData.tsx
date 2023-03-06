import { Box, Text, Flex } from "@chakra-ui/react"

export default function ContributorData() {
  return (
    <Flex alignItems="center" gap="8px" mr="auto">
      <Box
        width="60px"
        h="60px"
        bg="gray.400"
        rounded="full"
        px="16px"
      />
      <Box>
        <Text fontSize="xl" fontWeight="semibold">
          Username
        </Text>
        <Text>Title</Text>
      </Box>
    </Flex>
  )
}
