import { IconButton } from "@chakra-ui/react"
import { BiDownvote } from "react-icons/bi"

export default function DownVote() {
  return (
    <IconButton
      aria-label="Down Vote"
      color="green.400"
      icon={<BiDownvote />}
      size="sm"
      fontSize="2xl"
      variant="unstyled"
    />
  )
}
