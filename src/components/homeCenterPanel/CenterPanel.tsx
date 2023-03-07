import {
  Box,
  useBreakpointValue,
} from "@chakra-ui/react"
import HomeCenterPanelheader from "./HomeCenterPanelHeader"
import HomeCenterPanelBody from "./HomeCenterPanelBody"
import FloatingButton from "./floatingActionButton"

export default function CenterPanel() {
  const smVariant = {
    navigation: "drawer",
    navigationButton: true,
  }
  const mdVariant = {
    navigation: "sidebar",
    navigationButton: false,
  }
  const variants: any = useBreakpointValue({
    base: smVariant,
    md: mdVariant,
  })

  return (
    <Box
      ml={
        !variants?.navigationButton ? "20%" : "5%"
      }
      mr={["0", "0", "25%"]}
      w="100%"
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
      <HomeCenterPanelheader
        showSidebarButton={
          variants?.navigationButton
        }
      />

      <HomeCenterPanelBody
        showSidebarButton={
          variants?.navigationButton
        }
      />
      <FloatingButton />
    </Box>
  )
}
