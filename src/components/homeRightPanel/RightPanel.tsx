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

type RightPanelType = {
  panelHeader?: JSX.Element
  panelBody?: JSX.Element
}
export default function RightPanel({
  panelBody,
  panelHeader,
}: RightPanelType) {
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
        {panelHeader}
        {panelBody}
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
            {panelHeader}
          </DrawerHeader>
          <DrawerBody py={16}>
            {panelBody}
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}
