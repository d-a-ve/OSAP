import {
  Box,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react"

export default function AppOptionBtn({
  title,
  link,
}: {
  title: string
  link: string
}) {
  function handleClick() {
    window.location.assign(link)
  }

  return (
    <Button
      bg="whitesmoke"
      color="black"
      fontSize={["md", "lg", "lg"]}
      w={["90%", "60%", "90%", "70%"]}
      fontWeight="semibold"
      my="8px"
      cursor={"pointer"}
      onClick={handleClick}
    >
      {title}
    </Button>
  )
}
