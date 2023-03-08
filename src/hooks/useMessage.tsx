import { useEffect, useRef, useState, useLayoutEffect } from "react"
import { sortMessagesByDate } from "../utils/helpers/functions"

type Props = {
    name?: string
      avatar?: string
      message?: string
      displayVote?: boolean
      votes?: number
      dateCreated: Date
  }[]

export function useMessage() {
    const [message, setMessage] = useState<string>("")
    const [messagesData, setMessagesData] = useState<Props>([])
    const [messagesTest, setMessagesTest] = useState<Props>([
      {
        dateCreated: new Date(2023, 2, 7, 15, 39, 0 ),
        message: "Testing",
        name: "Dave",
        displayVote: false
      }
    ])
    const [chatBottomPadding, setChatBottomPadding] = useState<number>()
    const boxRef = useRef<HTMLDivElement>(null)
    const buttonBoxRef = useRef<HTMLDivElement>(null)
    const tabRef = useRef<HTMLDivElement>(null)
    const messagesColumnRef = useRef<HTMLDivElement>(null)

// this does not work as i intended. What i had in mind was to use it to set the height of the chat box
useLayoutEffect(() => {
    if(!boxRef.current || !buttonBoxRef.current || !tabRef.current) {
      throw Error("boxRef is not assigned")
    }

   setChatBottomPadding((boxRef.current.clientHeight * 2) + buttonBoxRef.current.clientHeight + tabRef.current.clientHeight) 
  }, [message])

  // This effect is for getting the messages from where we store the messages
  useEffect(() => {
    const lastMessages = sortMessagesByDate(messagesTest);
    setMessagesData((state) => [...lastMessages, ...state])
  }, [messagesTest])

  useEffect(() => {
    if(!messagesColumnRef.current) {
      throw Error("MessagesColumnRef is not assigned")
    }

    messagesColumnRef.current.scrollTop =
      messagesColumnRef.current.scrollHeight;
  }, [messagesData]);
  
  function handleChange(e:React.ChangeEvent<HTMLInputElement>) {
    setMessage(e.target.value)
  }

  function sendMessage() {
setMessagesData((prevTest) => ([...prevTest, {name:"Dave", message: message, displayVote: false, dateCreated: (new Date())}]))
setMessage("")
  }

  return {
    message,
    messagesData,
    buttonBoxRef,
    boxRef,
    tabRef,
    handleChange,
    sendMessage,
    chatBottomPadding,
    messagesColumnRef,
  }
}