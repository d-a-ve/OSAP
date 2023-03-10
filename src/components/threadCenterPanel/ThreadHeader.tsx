import {
  Box,
  Heading,
  Text,
  Flex,
} from "@chakra-ui/react"

type ThreadHeaderType = {
  name?: string
  topic?: string
  dateCreated?: string
}

export default function ThreadHeader({
  name,
  topic,
  dateCreated,
}: ThreadHeaderType) {
  return (
    <>
      {/* thread creator details */}
      {name && (
        <>
          <Flex align="center" gap={3}>
            <Box
              w="60px"
              h="60px"
              rounded="full"
              bg="gray.300"
            />
            <Box>
              <Heading size={["sm", "sm", "md"]}>
                {name}
              </Heading>
              <Text fontSize={["xs", "xs", "md"]}>
                {dateCreated}
              </Text>
            </Box>
          </Flex>
          <Heading
            mt={3}
            size={["md", "md", "md", "lg"]}
          >
            {topic}
          </Heading>
        </>
      )}
    </>
  )
}
