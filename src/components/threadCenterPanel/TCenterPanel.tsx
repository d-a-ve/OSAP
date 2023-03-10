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
  Center,
  Spinner,
} from "@chakra-ui/react"
import { BiArrowBack } from "react-icons/bi"
import OverviewChatCard from "./OverviewChatCard"
import OverviewPanel from "./OverviewPanel"
import MessageInput from "./MessageInput"
// import { scrollBarStyle } from "../../styles/scrollbarStyle"
import TCenterPanelHeader from "./TCenterPanelHeader"
import ChatPanel from "./ChatPanel"
import { useMessage } from "@/hooks/useMessage"
import {
  useContext,
  useEffect,
  useState,
} from "react"
import { GlobalContext } from "@/contexts/global"

export default function TCenterPanel({
  id,
}: {
  id: number
}) {
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

  const { postList, primaryProfile }: any =
    useContext(GlobalContext)

  const [essence, setEssence] = useState(null)
  /* eslint-disable react-hooks/rules-of-hooks */
  useEffect(() => {
    if (postList && postList.length > 0) {
      if (!essence) {
        console.log("idddd", id)
        const xx = postList.filter(
          (x: any) => x.essenceID === id
        )
        if (xx) {
          setEssence(xx)
        }
      }
    }
  }, [essence, postList])

  useEffect(() => {
    if (essence) {
      console.log("nnnn", essence)
    }
  }, [essence])

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
      <TCenterPanelHeader />

      <Tabs
        isFitted
        variant="enclosed"
        colorScheme="green.300"
        size="lg"
      >
        <TabList pt={3}>
          <Tab>Overview</Tab>
          <Tab>Chat</Tab>
        </TabList>
        {!essence ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <TabPanels>
            <TabPanel
              h="100vh"
              overflow="auto"
              //sx={scrollBarStyle}
            >
              {essence && (
                <OverviewPanel
                  essence={essence}
                />
              )}
            </TabPanel>
            <TabPanel p={0}>
              {/* <ChatPanel
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
              /> */}
            </TabPanel>
          </TabPanels>
        )}
      </Tabs>
    </Box>
  )
}
