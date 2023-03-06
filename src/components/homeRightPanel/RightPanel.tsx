import {
  Box,
  Button,
  Center,
} from "@chakra-ui/react"
import TopContributorSection from "./TopContributorSection"
import FollowContributorSection from "./FollowContributorSection"

export default function RightPanel({
  isConnected,
  disconnect,
  connect,
}: {
  isConnected: boolean | undefined
  disconnect: () => void
  connect: () => Promise<void>
}) {
  return (
    <Box py="8px" w="25%" maxH="100%">
      <Center py="8px">
        <Button
          bg="green.300"
          fontSize="xl"
          py="8px"
          fontWeight="semibold"
          color="white"
          w="70%"
          onClick={
            isConnected ? disconnect : connect
          }
        >
          {isConnected ? "Disconnect" : "Connect"}
        </Button>
      </Center>
      <TopContributorSection />
      <FollowContributorSection />
    </Box>
  )
}
