import { GlobalContext } from "@/contexts/global"
import { extractCID } from "@/utils/helpers/functions"
import { IPosts } from "@/utils/types"
import {
  Box,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react"
import {
  useContext,
  useEffect,
  useState,
} from "react"
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
  const { postList, primaryProfile }: any =
    useContext(GlobalContext)

  return (
    <Box
      mt="60px"
      bg="white"
      w={
        !variants?.navigationButton
          ? "100%"
          : "27%"
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

        {postList &&
          postList.length > 0 &&
          postList.map(
            (details: IPosts, i: number) => (
              <ThreadCard
                postObj={details}
                key={i}
              />
            )
          )}
      </Stack>
    </Box>
  )
}
