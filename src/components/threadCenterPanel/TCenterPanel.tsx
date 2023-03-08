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

  const messages = messagesData?.map(
    (message, i) => {
      return (
        <OverviewChatCard
          key={i}
          dateCreated={message.dateCreated}
          name={message.name}
          message={message.message}
          displayVote={false}
        />
      )
    }
  )

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
        !variants?.navigationButton ? "20%" : "5%"
      }
      mr={["0", "0", "25%"]}
      w="100%"
      h="100vh"
      flex={2}
      border="1px"
      borderColor="gray.100"
    >
      <Box pt={4} pl={4} ref={buttonBoxRef}>
        <Button
          bg="green.300"
          leftIcon={<BiArrowBack />}
          color="white"
        >
          <Link to="..">Back</Link>
        </Button>
      </Box>
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
            <Stack
              h={`calc(100vh - ${chatBottomPadding}px)`}
              overflow="auto"
              sx={scrollBarStyle}
              ref={messagesColumnRef}
            >
              {messages}
            </Stack>
            <MessageInput
              message={message}
              handleChange={handleChange}
              sendMessage={sendMessage}
              boxRef={boxRef}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}
