
import {
  Box,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react"
import CreateThread from "./CreateThread"
import PopularThreadsSection from "./PopularThreadSection"
import ThreadCard from "./ThreadCard"

interface Props {
  showSidebarButton?: boolean
}

export default function HomeCenterPanelBody({
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
    <Box
      mt="60px"
      bg="white"
      w={
        !variants?.navigationButton
          ? "100%"
          : "25%"
      }
      overflowY="auto"
      overflowX="hidden"
      position={"relative"}
    >
      {!variants?.navigationButton && (
        <CreateThread />
      )}

      <Stack spacing="0px">
        <PopularThreadsSection />
        <ThreadCard />
        <ThreadCard />
        <ThreadCard />
      </Stack>
    </Box>
  )
}

