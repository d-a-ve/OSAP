import {
  Box,
  Heading,
  Stack,
} from "@chakra-ui/react"
import { ReactNode } from "react"

export default function ContributorSectionLayout({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <Box
      rounded="xl"
      m={["8px", "8px","16px"]}
      bg="rgb(248 250 252, 0.7)"
    >
      <Heading
        size="md"
        textAlign="center"
        py={["8px","8px", "16px"]}
      >
        {title}
      </Heading>
      <Stack spacing={0} pb={4}>
        {children}
      </Stack>
    </Box>
  )
}
