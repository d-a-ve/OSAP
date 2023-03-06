import {
  Box,
  Stack,
  Text,
} from "@chakra-ui/react"
import ThreadCard from "./ThreadCard"
import CreateThread from "./CreateThread"
import PopularThreadsSection from "./PopularThreadSection"

export default function CenterPanel() {
  return (
    <Box
      ml="20%"
      flex={2}
      overflow="auto"
      border="1px"
      borderColor="gray.100"
      py="16px"
      className="center-panel"
    >
      <Box pl="8px" fontSize="lg" pb="8px">
        <Text>OSAP Logo</Text>
      </Box>
      <CreateThread />
      <Stack spacing="0px">
        <ThreadCard />
        <PopularThreadsSection />
        <ThreadCard />
        <ThreadCard />
        <ThreadCard />
        <ThreadCard />
      </Stack>
    </Box>
  )
}
