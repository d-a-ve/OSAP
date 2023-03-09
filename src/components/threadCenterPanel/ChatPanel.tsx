import { Stack } from "@chakra-ui/react"
import OverviewChatCard from "./OverviewChatCard"
import MessageInput from "./MessageInput"
//import { scrollBarStyle } from "../styles/scrollbarStyle"

type ChatPanelType = {
  messagesData?: any
  message?: string
  chatBottomPadding?: number
  messagesColumnRef?: React.RefObject<HTMLDivElement>
  boxRef?: React.RefObject<HTMLDivElement>
  sendMessage?: () => void
  handleChange?: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void
}
export default function ChatPanel({
  messagesData,
  message,
  chatBottomPadding,
  messagesColumnRef,
  boxRef,
  sendMessage,
  handleChange,
}: ChatPanelType) {
  const messages = messagesData?.map(
    (message: any, i: any) => {
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
  return (
    <>
      <Stack
        h={`calc(100vh - ${chatBottomPadding}px)`}
        overflow="auto"
        //sx={scrollBarStyle}
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
    </>
  )
}
