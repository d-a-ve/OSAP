import { IconButton } from "@chakra-ui/react"
import { BiUpvote } from "react-icons/bi"

export default function UpVote() {
  return (
    <IconButton
      aria-label="Up Vote"
      color="green.400"
      icon={<BiUpvote />}
      size="sm"
      fontSize="2xl"
      variant="unstyled"
    />
  )
}
