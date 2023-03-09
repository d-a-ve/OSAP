import {
  Box,
  useBreakpointValue,
} from "@chakra-ui/react"
import SideBarButton from "./SideBarButton"

interface Props {
  showSidebarButton?: boolean
}

export default function HomeCenterPanelheader({
  showSidebarButton = true,
}: Props) {
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
    <>
      <Box
        pl="8px"
        fontSize="lg"
        pb="8px"
        bg="white"
        position={"fixed"}
        zIndex="tooltip"
        mt={0}
        ml={["5%", "10%", 0]}
        h="60px"
        w={
          !variants?.navigationButton
            ? "100%"
            : "80%"
        }
        shadow={"sm"}
        display="flex"
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Box
          ml={4}
          as="img"
          src="OSAP.svg"
          alt="osap_ogo"
          h="45px"
        />

        <Box pr={8}>
          {showSidebarButton && <SideBarButton />}
        </Box>
      </Box>
    </>
  )
}
