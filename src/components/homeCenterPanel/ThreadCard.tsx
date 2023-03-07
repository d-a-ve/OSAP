import {
  Box,
  Card,
  CardBody,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react"
import ThreadDetail from "./ThreadDetail"

export default function ThreadCard() {
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
    // check the card example on the chakra ui website for a complete sample
    <Card
      rounded="0px"
      direction="row"
      variant="outline"
      border="0px"
      borderTop="1px"
      borderColor="gray.100"
      _hover={{ background: "gray.50" }}
      px={!variants?.navigationButton ? 12 : 4}
    >
      <Box pt="16px" pl="8px">
        {/* use Avatar component  */}
        <Box
          bg="gray.400"
          rounded="full"
          height="50px"
          width="50px"
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
