import { AddIcon } from "@chakra-ui/icons"
import {
  Button,
  useBreakpointValue,
} from "@chakra-ui/react"

export default function FloatingButton() {
  const smVariant = {
    navigation: "drawer",
    navigationButton: true,
  }
  const mdVariant = {
    navigation: "sidebar",
    navigationButton: false,
  }
  const variants: any = useBreakpointValue({
    base: smVariant,
    md: mdVariant,
  })

  return (
    <>
      {/* Show only on mobile */}
      {variants?.navigationButton && (
        <Button
          leftIcon={<AddIcon fontSize="18px" />}
          aria-label="New Post"
          position="fixed"
          bottom="6"
          right="6"
          fontSize="18px"
          size="lg"
          colorScheme="green"
        >
          {" "}
          New Post
        </Button>
      )}
    </>
  )
}
