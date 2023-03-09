import {
  Box,
  Heading,
  Text,
  Flex,
  Card,
  useMediaQuery,
  CardBody,
} from "@chakra-ui/react"
import {
  BiUpvote,
  BiDownvote,
} from "react-icons/bi"
import { formatDateTime } from "../../utils/helpers/functions"
import ChatCardFooter from "./ChatCardFooter"
import DownVote from "./DownVote"
import OverviewVotes from "./OverviewVotes"
import UpVote from "./UpVote"

type ChatCardType = {
  name?: string
  avatar?: string
  message?: string
  displayVote?: boolean
  votes?: number
  overview?: boolean
  dateCreated?: Date
}

export default function OverviewChatCard({
  name,
  avatar,
  message,
  displayVote,
  votes,
  overview,
  dateCreated,
}: ChatCardType) {
  const [isMobile] = useMediaQuery(
    "(min-width: 500px)"
  )

  return (
    <Card
      pl={4}
      pt={4}
      rounded={!overview ? "none" : "md"}
      direction="row"
      align="flex-start"
      bg="gray.50"
    >
      {displayVote && (
        <OverviewVotes votes={votes} />
      )}

      {/* // avatar here */}
      {
        <Box
          w={overview ? "60px" : "40px"}
          h={overview ? "60px" : "40px"}
          rounded="full"
          bg="gray.300"
        />
      }

      <CardBody mt="-20px" p={4}>
        <Flex gap={2}>
          <Heading size="sm" mb={1}>
            {name}
          </Heading>
          {!overview && (
            <Box as="span" fontSize="sm">
              {formatDateTime(dateCreated)}
            </Box>
          )}
        </Flex>
        <Text fontSize={overview ? "md" : "sm"}>
          {message}
        </Text>

        {!overview && (
          <ChatCardFooter
            upVotes="5"
            downVotes="4"
          />
        )}
      </CardBody>
    </Card>
  )
}
