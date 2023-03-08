import {
  Box,
  Heading,
  Text,
  Flex,
  Card,
  IconButton,
  CardBody,
} from "@chakra-ui/react"
import {
  BiUpvote,
  BiDownvote,
} from "react-icons/bi"
import { formatDateTime } from "../../utils/helpers/functions"
import ChatCardFooter from "./ChatCardFooter"

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
        <Flex direction="column">
          <IconButton
            aria-label="Up Vote"
            color="green.400"
            icon={<BiUpvote />}
            size="sm"
            fontSize="2xl"
            variant="unstyled"
          />
          <Text fontSize="2xl" ml={1}>
            {votes}
          </Text>
          <IconButton
            aria-label="Down Vote"
            color="green.400"
            icon={<BiDownvote />}
            size="sm"
            fontSize="2xl"
            variant="unstyled"
          />
        </Flex>
      )}

      {/* // avatar here */}
      <Box
        w={overview ? "60px" : "40px"}
        h={overview ? "60px" : "40px"}
        rounded="full"
        bg="gray.300"
      />

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
