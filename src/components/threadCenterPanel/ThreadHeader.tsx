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
      <Flex align="center" gap={3}>
        <Box
          w="60px"
          h="60px"
          rounded="full"
          bg="gray.300"
        />
        <Box>
          <Heading size="md">
            Segun Adebayo
          </Heading>
          <Text>Created on Mar. 23</Text>
        </Box>
      </Flex>
      <Heading mt={3} size={["md", "md", "lg"]}>
        Lorem ipsum dolor sit amet consectetur,
        adipisicing elit. Quibusdam corrupti
        pariatur nam quia unde ullam vel
        aspernatur est, explicabo facere veniam
        mollitia, tenetur impedit ducimus alias
        reprehenderit quis veritatis! Debitis!
      </Heading>
    </>
  )
}
