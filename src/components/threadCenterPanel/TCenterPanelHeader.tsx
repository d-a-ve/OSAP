import {
  Flex,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { BiArrowBack } from "react-icons/bi"
import SideBarButton from "../homeCenterPanel/SideBarButton"

export default function TCenterPanelHeader({}: {}) {
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

  const router = useRouter()
  const showSidebarButton =
    variants?.navigationButton

  function handlePop() {
    router.back()
  }

  return (
    <Flex
      pt={[6, 6, 4]}
      px={4}
      // ref={buttonBoxRef}
      justify="space-between"
    >
      <Button
        bg="green.300"
        leftIcon={<BiArrowBack />}
        color="white"
        onClick={handlePop}
      >
        Back
      </Button>
    </Flex>
  )
}
