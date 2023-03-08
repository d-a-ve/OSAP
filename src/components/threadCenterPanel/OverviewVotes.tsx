import { Flex, Text } from "@chakra-ui/react"
import UpVote from "./UpVote"
import DownVote from "./DownVote"

export default function OverviewVotes({
  votes,
}: {
  votes?: number
}) {
  return (
    <Flex direction="column">
      <UpVote />
      <Text fontSize="2xl" ml={1}>
        {votes}
      </Text>
      <DownVote />
    </Flex>
  )
}
