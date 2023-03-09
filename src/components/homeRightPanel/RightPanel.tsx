import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useBreakpointValue,
} from "@chakra-ui/react"
import { useContext } from "react"
import { GlobalContext } from "../../contexts/global"
import RightPanelBody from "./RightPanelBody"
import RightPanelHeader from "./RightPanelHeader"

export default function RightPanel() {
  const { isSidebarOpen, setSidebarOpen }: any =
    useContext(GlobalContext)
  const toggleSidebar = () =>
    setSidebarOpen(!isSidebarOpen)
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
  return variants?.navigation === "sidebar" ? (
    <Box
      w="20%"
      pb="16px"
      pos="fixed"
      height="100vh"
      zIndex={"tooltip"}
    >
      <Box
        py="8px"
        w="25%"
        maxH="100%"
        h="100vh"
        position={"fixed"}
        right={0}
        bg="white"
      >
        <Box
          as="img"
          src="/triangle.png"
          opacity={0.35}
          h="140vh"
          w="100%"
          zIndex={-6}
          position={"absolute"}
        />

        <Box
          as="img"
          src="/circle1.png"
          opacity={0.25}
          h="30vh"
          w="100%"
          zIndex={-6}
          position={"absolute"}
        />

        <RightPanelHeader />

        <RightPanelBody />
      </Box>
    </Box>
  ) : (
    <Drawer
      isOpen={isSidebarOpen}
      placement="right"
      onClose={toggleSidebar}
    >
      <DrawerOverlay>
        <DrawerContent bg={"white"}>
          <DrawerHeader>
            <RightPanelHeader />
          </DrawerHeader>
          <DrawerBody py={16}>
            <RightPanelBody />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}
