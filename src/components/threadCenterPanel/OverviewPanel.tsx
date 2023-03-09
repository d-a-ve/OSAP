import { Box } from "@chakra-ui/react"
import ThreadHeader from "./ThreadHeader"
import ThreadBody from "./ThreadBody"

export default function OverviewPanel() {
  return (
    <Box roundedTop="lg" mb="100px">
      <Box w="100%" h="300px" bg="gray.300" />
      <Box
        p={["0", "0", "5"]}
        pt={["5", "5", "5"]}
      >
        <ThreadHeader />
        <ThreadBody />
      </Box>
    </Box>
  )
}
