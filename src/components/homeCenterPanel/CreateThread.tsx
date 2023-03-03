import {
  Box,
  Text,
  Card,
  CardBody,
  Textarea,
  Flex,
  Button,
} from "@chakra-ui/react"

export default function CreateThread() {
  return (
    <Card rounded="0px" direction="row">
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
        <Box w="">
          <Textarea
            placeholder="Have you discovered a new challenge?"
            rows={3}
            w="100%"
            resize="none"
            variant="flushed"
            size="lg"
          />
          <Flex
            align="center"
            justify="space-between"
            mt="8px"
            px="8px"
          >
            <Text>Video Icon</Text>
            <Button
              bg="green.300"
              textColor="white"
              fontSize="md"
            >
              POST
            </Button>
          </Flex>
        </Box>
      </CardBody>
    </Card>
  )
}
