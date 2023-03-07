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
      <Center py="8px">
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
            bg="green.300"
            fontSize="xl"
            py="8px"
            fontWeight="semibold"
            color="white"
            w="70%"
            onClick={
              address ? disconnect : connectWallet
            }
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
