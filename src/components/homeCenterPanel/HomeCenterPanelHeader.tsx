import {
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@chakra-ui/icons"
import {
  Box,
  IconButton,
  MenuIcon,
  useBreakpointValue,
} from "@chakra-ui/react"
import { useContext, useState } from "react"
import { RiMenu2Fill } from "react-icons/ri"
import { GlobalContext } from "../../contexts/global"

interface Props {
  showSidebarButton?: boolean
}

export default function HomeCenterPanelheader({
  showSidebarButton = true,
}: Props) {
  const {
    isSidebarOpen,
    setSidebarOpen,
    setisMoved,
    isMoved,
  }: any = useContext(GlobalContext)
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

  function handleShift() {
    setisMoved(!isMoved)
  }

  return (
    <>
      <Box
        pl="8px"
        fontSize="lg"
        pb="8px"
        bg="rgba(255, 255, 255, 0.9)"
        position={"fixed"}
        zIndex="tooltip"
        mt={0}
        ml={[0, 0, 0]}
        h="60px"
        className=".nav-header"
        w={
          !variants?.navigationButton
            ? "54.5%"
            : "100%"
        }
        shadow={"sm"}
        display="flex"
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Box display={"flex"} ml={4}>
          {variants?.navigationButton && (
            <IconButton
              bg="whitesmoke"
              border="1px solid gray"
              icon={
                isMoved ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )
              }
              aria-label={""}
              onClick={handleShift}
            />
          )}
          <Box
            ml={4}
            as="img"
            src="OSAP.svg"
            alt="osap_ogo"
            h="45px"
          />
        </Box>

        <Box pr={8}>
          {showSidebarButton && (
            <IconButton
              w={8}
              h={8}
              border="none"
              fontWeight={"extrabold"}
              icon={<RiMenu2Fill />}
              color="blackAlpha.800"
              variant="outline"
              onClick={toggleSidebar}
              aria-label={""}
            />
          )}
        </Box>
      </Box>
    </>
  )
}
