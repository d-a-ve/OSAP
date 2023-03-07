import { LinkIcon } from "@chakra-ui/icons"
import {
  Box,
  Text,
  Card,
  CardBody,
  Textarea,
  Flex,
  Button,
  HStack,
} from "@chakra-ui/react"
import { RiImageAddFill, RiVideoAddFill } from "react-icons/ri"




export default function CreateThread() {
  return (
    <Card rounded="0px" direction="row" px={12}>

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
            <HStack spacing={5} color="green" alignItems="center" fontSize={"xl"}>
              <LinkIcon />
              <RiImageAddFill />
              <RiVideoAddFill />
            </HStack>

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
