import {
  Flex,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react"
import { BiArrowBack } from "react-icons/bi"
import SideBarButton from "../homeCenterPanel/SideBarButton"

export default function TCenterPanelHeader({
  buttonBoxRef,
}: {
  buttonBoxRef: React.RefObject<HTMLDivElement>
}) {
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

  const showSidebarButton =
    variants?.navigationButton

  return (
    <Flex
      pt={[6, 6, 4]}
      px={4}
      ref={buttonBoxRef}
      justify="space-between"
    >
     
        <Button
          bg="green.300"
          leftIcon={<BiArrowBack />}
          color="white"
        >
          Back
        </Button>
   
    </Flex>
  )
}
