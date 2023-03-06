import { Box, Text, Flex } from "@chakra-ui/react"
import ContributorData from "./ContributorData"

export default function TopContributorCard() {
  return (
    <Flex
      bg="transparent"
      rounded="0"
      align="center"
      justify="space-between"
      p="16px"
      gap="12px"
    >
      <Text>S/N</Text>
      <ContributorData />
      <Box>
        <Text>Up votes</Text>
      </Box>
    </Flex>
  )
}
