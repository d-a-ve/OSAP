import { Box } from "@chakra-ui/react"
import FollowContributorSection from "./FollowContributorSection"
import TopContributorSection from "./TopContributorSection"

export default function RightPanelBody() {
  return (
    <>
      {/* Allow the body to scroll if screensize is smaller */}
      <Box
        overflowY="auto"
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
            backgroundColor: "red.300",
            borderRadius: "3px",
          },
          scrollbarWidth: "thin",
        }}
      >
        <TopContributorSection />

        <FollowContributorSection />
      </Box>
    </>
  )
}
