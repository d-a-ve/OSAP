import { ChevronRightIcon } from "@chakra-ui/icons"
import {
  Box,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react"
import { useContext } from "react"
import { GlobalContext } from "../../contexts/global"

export default function SideBarButton() {
  const { isSidebarOpen, setSidebarOpen }: any =
    useContext(GlobalContext)

  const toggleSidebar = () =>
    setSidebarOpen(!isSidebarOpen)

  return (
    <IconButton
      icon={<ChevronRightIcon w={8} h={8} />}
      color="blackAlpha.800"
      variant="outline"
      onClick={toggleSidebar}
      aria-label={""}
    />
  )
}
