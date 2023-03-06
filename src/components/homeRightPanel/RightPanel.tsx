import {
  Box,
  Button,
  Center,
} from "@chakra-ui/react"
import TopContributorSection from "./TopContributorSection"
import FollowContributorSection from "./FollowContributorSection"
import RightPanelBody from "./RightPanelBody"
import RightPanelHeader from "./RightPanelHeader"

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
    <Box
      py="8px"
      w="25%"
      maxH="100%"
      h="100vh"
      position={"fixed"}
      right={0}
    >
      <RightPanelHeader
        isConnected={isConnected}
        disconnect={disconnect}
        connect={connect}
      />

      <RightPanelBody />
    </Box>
  )
}
