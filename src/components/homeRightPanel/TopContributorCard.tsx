import { Box, Text, Flex } from "@chakra-ui/react"
import ContributorData from "./ContributorData"
import { RiArrowUpSLine } from "react-icons/ri"
import { Icon } from "@chakra-ui/react"
import { TriangleUpIcon } from "@chakra-ui/icons"

type myScoreType = boolean | null

export default function TopContributorCard(prop: {
  myScore: myScoreType
}) {
  return (
    <Flex
      bg={
        prop.myScore ? "green.100" : "transparent"
      }
      rounded="0"
      align="center"
      justify="space-between"
      p="16px"
      gap="12px"
    >
      <Text fontSize={"xs"}>S/N</Text>
      <ContributorData />
      <Box display={"flex"}>
        <Icon as={TriangleUpIcon} boxSize={6} />
        <Text>0</Text>
      </Box>
    </Flex>
  )
}
