import {
  Box,
  useBreakpointValue,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Stack,
} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { BiArrowBack } from "react-icons/bi"
import OverviewChatCard from "./OverviewChatCard"
import OverviewPanel from "./OverviewPanel"
import MessageInput from "./MessageInput"
import { useMessage } from "../../hooks/useMessage"
import { scrollBarStyle } from "../../styles/scrollbarStyle"
import TCenterPanelHeader from "./TCenterPanelHeader"
import ChatPanel from "./ChatPanel"

export default function TCenterPanel() {
  const {
    message,
    messagesData,
    buttonBoxRef,
    boxRef,
    tabRef,
    handleChange,
    sendMessage,
    chatBottomPadding,
    messagesColumnRef,
  } = useMessage()

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
    <Box
      ml={
        !variants?.navigationButton ? "20%" : "0"
      }
      mr={["0", "0", "25%"]}
      w="100%"
      h="100vh"
      flex={2}
      border="1px"
      borderColor="gray.100"
    >
      <TCenterPanelHeader
        buttonBoxRef={buttonBoxRef}
      />

      <Tabs
        isFitted
        variant="enclosed"
        colorScheme="green.300"
        size="lg"
      >
        <TabList pt={3} ref={tabRef}>
          <Tab>Overview</Tab>
          <Tab>Chat</Tab>
        </TabList>
        <TabPanels>
          <TabPanel
            h="100vh"
            overflow="auto"
            sx={scrollBarStyle}
          >
            <OverviewPanel />
          </TabPanel>
          <TabPanel p={0}>
            <ChatPanel
              handleChange={handleChange}
              message={message}
              messagesData={messagesData}
              messagesColumnRef={
                messagesColumnRef
              }
              sendMessage={sendMessage}
              boxRef={boxRef}
              chatBottomPadding={
                chatBottomPadding
              }
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}
