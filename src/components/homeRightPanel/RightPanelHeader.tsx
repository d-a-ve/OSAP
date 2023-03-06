import {
  Box,
  Button,
  Center,
} from "@chakra-ui/react"

export default function RightPanelHeader(prop: {
  isConnected: boolean | undefined
  disconnect: () => void
  connect: () => Promise<void>
}) {
  return (
    <>
      <Center py="8px">
        <Button
          bg="green.300"
          fontSize="xl"
          py="8px"
          fontWeight="semibold"
          color="white"
          w="70%"
          onClick={
            prop.isConnected
              ? prop.disconnect
              : prop.connect
          }
        >
          {prop.isConnected
            ? "Disconnect"
            : "Connect"}
        </Button>
      </Center>
    </>
  )
}
