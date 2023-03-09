import { GlobalContext } from "@/contexts/global"
import {
  Box,
  Flex,
  Grid,
  Heading,
  HStack,
} from "@chakra-ui/react"
import { useContext } from "react"
import ThreadDetail from "./ThreadDetail"

export default function PopularThreadsSection() {
  const { postList, primaryProfile } = useContext(GlobalContext);
  const xx = [{
    content: '', description: '', image_data: '', tags: [], issue_date: "",
    name: "", handle: "", bio: "", avatar: "", essenceID: 0,
  }
  ];
  const mock = Array.from({ length: 4 }, () => xx[0]);
  const count = postList && postList.length > 0 ? Array.from({ length: 4 }, () => postList[0]) : null;
  return (
    <Box borderY="1px" borderColor="gray.100">
      {primaryProfile && (
        <Heading
          size="md"
          px={12}
          py="16px"
          borderBottom="1px solid whitesmoke"
        >
          Popular/Trending Challenges
        </Heading>
      )}

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

        {
          count && (
            count.map((x, i) => (
              <Flex
                pl={4}
                key={i}
                py={6}
                shadow="lg"
              // h="140px"

              >
                <Box flex={"1"} bg={
                  "white"} w="70%" h="100%">
                  <ThreadDetail postObj={x} width="300px" />
                </Box>

                <Box w="30%" h="100%"
                  bg="gray.200"
                  rounded={"full"}
                  opacity={0.1}
                  as="img"
                  src={x.image_data}
                />

              </Flex>
            ))

          )
        }

        {
          !count && (
            mock.map((x, i) => (
              <Box
                pl={4}
                key={i}
                py={6}
              >
                <Box width="300px" />
              </Box>
            ))

          )
        }




      </Grid>
    </Box>
  )
}
