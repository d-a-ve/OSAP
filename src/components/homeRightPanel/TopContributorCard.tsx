import { Box, Text, Flex } from "@chakra-ui/react"
import ContributorData from "./ContributorData"
import { RiArrowUpSLine } from "react-icons/ri"
import { Icon } from "@chakra-ui/react"
import { TriangleUpIcon } from "@chakra-ui/icons"
import { GlobalContext } from "@/contexts/global"
import { useContext } from "react"

type myScoreType = boolean | null

export default function TopContributorCard(prop: {
  myScore: myScoreType
  owner: string
  sn: number
  votes: string
  rank: string
}) {
  const { address, primaryProfile }: any =
    useContext(GlobalContext)

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
      {prop.sn === 4 &&
        (address && primaryProfile ? (
          <Text fontSize={"lg"} fontWeight={800}>
            {prop.sn}
          </Text>
        ) : (
          <Text
            fontSize={"lg"}
            color="transparent"
            fontWeight={800}
          >
            {prop.sn === 4 ? prop.rank : prop.sn}
          </Text>
        ))}
      {prop.sn !== 4 && (
        <Text fontSize={"lg"} fontWeight={800}>
          {prop.sn}
        </Text>
      )}

      <ContributorData
        owner={prop.owner}
        i={prop.sn}
      />
      <Box display={"flex"}>
        {prop.sn !== 4 && (
          <Icon as={TriangleUpIcon} boxSize={6} />
        )}

        <Text>
          {prop.sn === 4 ? "" : prop.votes}
        </Text>
      </Box>
    </Flex>
  )
}
