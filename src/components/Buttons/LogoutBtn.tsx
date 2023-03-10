import { Button } from "@chakra-ui/react"

export default function LogoutBtn() {
  function logOut() {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <Button
      bg="red.400"
      _hover={{
        backgroundColor: "red.500",
      }}
      color="white"
      fontSize={["md", "lg", "lg"]}
      w={["90%", "60%", "90%", "70%"]}
      fontWeight="semibold"
      my="8px"
      cursor={"pointer"}
      mt={["100px", "70px"]}
      onClick={logOut}
    >
      Logout
    </Button>
  )
}
