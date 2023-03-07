import {
  Box,
  Grid,
  Heading,
} from "@chakra-ui/react"
import ThreadDetail from "./ThreadDetail"

export default function PopularThreadsSection() {
  const count = [1, 2, 3, 4]
  return (
    <Box borderY="1px" borderColor="gray.100"

    >
      <Heading
        size="md"
        px={12}
        py="16px"
        borderBottom="1px solid whitesmoke"
      >
        Popular/Trending Challenges
      </Heading>
      <Grid
        p="16px"
        pl={12}
        width="100%"
        overflowX="scroll"
        gridGap="15px"
        autoFlow="column"
        // Make scrollbar invisible
        sx={{
          "&::-webkit-scrollbar": {
            width: "0px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "white",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "white",
            borderRadius: "ƒ0px",
          },
        }}
      >
        {count.map((x) => (
          <Box
            pl={4}
            key={x}

            py={6}
            bg={"white"}
            shadow={"lg"}
          >
            <ThreadDetail width="300px" />
          </Box>
        ))}
      </Grid>
    </Box>
  )
}
