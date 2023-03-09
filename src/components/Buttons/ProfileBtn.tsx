import { Button } from "@chakra-ui/react"

export default function ProfileBtn({
  handleOnClick,
  text,
}: {
  handleOnClick?: () => void
  text: string
}) {
  return (
    <Button
      bg={"green.300"}
      _hover={{
        backgroundColor: "green.400",
      }}
      color={"white"}
      fontSize={["md", "lg", "lg"]}
      w={["90%", "60%", "90%", "70%"]}
      mt="8px"
      onClick={handleOnClick}
      cursor={"pointer"}
    >
      {text}
    </Button>
  )
}
