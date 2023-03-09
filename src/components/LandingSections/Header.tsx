import React, { useState } from "react"
import {
  Box,
  Flex,
  Image,
  Link,
  Text,
} from "@chakra-ui/react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <Flex
      as="nav"
      justify="space-between"
      align="center"
      wrap="wrap"
      padding="1rem"
    >
      <Box display="flex" alignItems="center">
        <Image
          src="OSAP.svg"
          alt="My Logo"
          width="50px"
          mr={2}
        />
      </Box>
    </Flex>
  )
}