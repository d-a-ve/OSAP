import { Box, Flex, Text } from "@chakra-ui/react"

export default function AppOptionCard({
  title,
}: {
  title: string
}) {
  return (
    <Flex
      columnGap="8px"
      fontSize="lg"
      fontWeight="semibold"
      mb="8px"
    >
      <Box>
        <Text>Icon</Text>
      </Box>
      <Box>
        <Text>{title}</Text>
      </Box>
    </Flex>
  )
}
