import {
  Text,
  Flex,
  IconButton,
} from "@chakra-ui/react"
import {
  BiUpvote,
  BiDownvote,
} from "react-icons/bi"

type ChatCardFooterType = {
  upVotes?: string
  downVotes?: string
}
export default function ChatCardFooter({
  upVotes,
  downVotes,
}: ChatCardFooterType) {
  return (
    <Flex>
      <Flex align="center">
        <IconButton
          aria-label="Up Vote"
          color="green.400"
          icon={<BiUpvote />}
          size="sm"
          fontSize="2xl"
          variant="unstyled"
        />
        <Text fontSize="sm" ml="-5px">
          {upVotes}
        </Text>
      </Flex>
      <Flex align="center" ml="15px">
        <IconButton
          aria-label="Down Vote"
          color="green.400"
          icon={<BiDownvote />}
          size="sm"
          fontSize="2xl"
          variant="unstyled"
        />
        <Text fontSize="sm" ml="-5px">
          {downVotes}
        </Text>
      </Flex>
    </Flex>
  )
}
