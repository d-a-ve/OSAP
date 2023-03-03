import {
  Box,
  Card,
  CardBody,
  Stack,
} from "@chakra-ui/react"
import ThreadDetail from "./ThreadDetail"

export default function ThreadCard() {
  return (
    // check the card example on the chakra ui website for a complete sample
    <Card
      rounded="0px"
      direction="row"
      variant="outline"
      borderBottom="3px"
      _hover={{ background: "gray.50" }}
    >
      <Box pt="16px" pl="8px">
        {/* use Avatar component  */}
        <Box
          bg="gray.400"
          rounded="full"
          height="70px"
          width="70px"
        />
      </Box>
      <CardBody>
        <Stack>
          <ThreadDetail />

          <Box
            w="100%"
            h="200px"
            bg="gray.400"
            rounded="md"
          />
        </Stack>
      </CardBody>
    </Card>
  )
}
