import { Box, Text, Flex } from "@chakra-ui/react"

export default function ContributorData() {
  return (
    <Flex alignItems="center" gap="8px" mr="auto">
      <Box
        width="30px"
        h="30px"
        bg="gray.400"
        rounded="full"
        px="16px"
      />
      <Box>
        <Text fontSize="xs" fontWeight="semibold">
          Username
        </Text>
        <Text fontSize="xs">Title</Text>
      </Box>
    </Flex>
  )
}
