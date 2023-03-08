import {
  Box,
  Text,
  Stack,
} from "@chakra-ui/react"
import ChatCard from "./OverviewChatCard"

const threadData = [
  {
    name: "Dave Aronmwan",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis quidem sequi mollitia? Sit, minima unde officia voluptatum natus facilis ut dignissimos quaerat facere a at debitis. Tempore rerum architecto maiores! Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque atque nesciunt aliquam minus quaerat esse sit praesentium eius. Sequi vitae possimus harum odio doloribus quasi voluptatibus maiores molestiae vel deserunt.",
    displayVote: true,
    votes: 8,
  },
  {
    name: "Segun Adegoke",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis quidem sequi mollitia? Sit, minima unde officia voluptatum natus facilis ut dignissimos quaerat facere a at debitis.",
    displayVote: true,
    votes: 4,
  },
  {
    name: "John Doe",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    displayVote: true,
    votes: 6,
  },
]
export default function ThreadBody() {
  const votedSolutions = threadData.map(
    (data, i) => (
      <ChatCard
        key={i}
        overview={true}
        name={data.name}
        displayVote={data.displayVote}
        message={data.message}
        votes={data.votes}
      />
    )
  )

  return (
    <Box mt={5}>
      {/* check stackoverflow section for more options to add to what's beside the solutions eg like a dropdown for solutions to show*/}
      <Text fontSize="xl">Solutions</Text>
      <Stack mt={2} spacing={4}>
        {votedSolutions}
      </Stack>
    </Box>
  )
}
