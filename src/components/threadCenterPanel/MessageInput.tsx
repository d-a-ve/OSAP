import React from "react"
import {
  Box,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  CardBody,
} from "@chakra-ui/react"
import { BiSend } from "react-icons/bi"

type MessageInputType = {
  message?: string
  handleChange?: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void
  sendMessage?: () => void
  boxRef?: React.LegacyRef<HTMLDivElement>
}

export default function MessageInput({
  message,
  handleChange,
  sendMessage,
  boxRef,
}: MessageInputType) {
  return (
    <Box
      pos="fixed"
      bottom="20px"
      right="25%"
      left="20%"
      px={4}
      ref={boxRef}
    >
      <InputGroup size="lg">
        <Input
          pr="3.7rem"
          placeholder="Message"
          focusBorderColor="green.100"
          value={message}
          onChange={handleChange}
        />
        <InputRightElement>
          <IconButton
          bg="green.300"
          color="white"
            // px={5}
            aria-label="Send Message"
            fontSize="2xl"
            icon={<BiSend/>}
            size="lg"
            onClick={sendMessage}
          />
        </InputRightElement>
      </InputGroup>
    </Box>
  )
}
