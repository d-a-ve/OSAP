import {
  Box,
  Grid,
  Heading,
} from "@chakra-ui/react"
import ThreadDetail from "./ThreadDetail"

export default function PopularThreadsSection() {
  return (
    <Box borderY="1px" borderColor="gray.100">
      <Heading
        size="lg"
        borderBottom="1px"
        p="16px"
        borderColor="gray.100"
      >
        Popular/Trending Challenges
      </Heading>
      <Grid
        p="16px"
        pl="32px"
        width="100%"
        overflowX="scroll"
        gap="8px"
        autoFlow="column"
      >
        <ThreadDetail width="300px" />
        <ThreadDetail width="300px" />
        <ThreadDetail width="300px" />
        <ThreadDetail width="300px" />
      </Grid>
    </Box>
  )
}
