import {
  Box,
  Stack,
  Text,
} from "@chakra-ui/react"
import ThreadCard from "./ThreadCard"
import CreateThread from "./CreateThread"
import PopularThreadsSection from "./PopularThreadSection"
import HomeCenterPanelheader from "./HomeCenterPanelHeader"
import HomeCenterPanelBody from "./HomeCenterPanelBody"

export default function CenterPanel() {
  return (
    <Box
      ml="20%"
      mr={["0", "0", "25%"]}
      flex={2}
      overflow="auto"
      border="1px"
      borderColor="gray.100"
      className="center-panel"
      overflowY="scroll"
      overflowX="hidden"
      position={"relative"}
      sx={{
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "green.200",
          borderRadius: "3px",
        },
        scrollbarWidth: "thin",
      }}
    >

      <HomeCenterPanelheader />

      <HomeCenterPanelBody />


    </Box>
  )
}
