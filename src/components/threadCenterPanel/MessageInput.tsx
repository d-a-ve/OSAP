import React from "react"
import {
  Box,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
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
      right={["0", "0", "25%"]}
      left={["0", "0", "20%"]}
      px={[2, 2, 4]}
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
            aria-label="Send Message"
            fontSize="2xl"
            icon={<BiSend />}
            size="lg"
            onClick={sendMessage}
          />
        </InputRightElement>
      </InputGroup>
    </Box>
  )
}
