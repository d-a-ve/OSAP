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
    <Box rounded="xl" m="16px" bg="gray.50">
      <Heading
        size="md"
        textAlign="center"
        py="16px"
      >
        {title}
      </Heading>
      <Stack
        spacing={0}
        overflowY="auto"
        h="400px"
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "&::-moz-scrollbar": {
            display: "none",
          },
        }}
      >
        {children}
      </Stack>
    </Box>
  )
}
