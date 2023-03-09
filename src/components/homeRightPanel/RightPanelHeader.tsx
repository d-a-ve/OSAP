import { ChevronLeftIcon } from "@chakra-ui/icons"
import {
  Box,
  Button,
  Center,
  IconButton,
} from "@chakra-ui/react"
import { useContext } from "react"
import { GlobalContext } from "../../contexts/global"

export default function RightPanelHeader() {
  const { isSidebarOpen, setSidebarOpen }: any =
    useContext(GlobalContext)
  const toggleRightPanel = () =>
    setSidebarOpen(!isSidebarOpen)

  const { address, connectWallet }: any =
    useContext(GlobalContext)
  const disconnect = () => {}

  return (
    <>
      <Center p="8px">
        <Box
          w="100%"
          display={"flex"}
          justifyContent={
            isSidebarOpen
              ? "space-between"
              : "center"
          }
        >
          {isSidebarOpen && (
            <IconButton
              zIndex={"tooltip"}
              icon={
                <ChevronLeftIcon w={8} h={8} />
              }
              color="blackAlpha.800"
              variant="outline"
              onClick={toggleRightPanel}
              aria-label={""}
            />
          )}
          <Button
            bg="#aeb0b4"
            fontSize="lg"
            py="8px"
            opacity={0.75}
            fontWeight="semibold"
            color="black"
            leftIcon={
              <Box
                as="img"
                h="26px"
                w="auto"
                src="/metamask.png"
              />
            }
            w="70%"
            _hover={{
              background: "#aeb0b4",
              opacity: "1",
            }}
          >
            {address
              ? "Connected"
              : "Disconnected"}
          </Button>{" "}
        </Box>
      </Center>
    </>
  )
}
