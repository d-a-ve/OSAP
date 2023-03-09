import {
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Modal,
  Box,
  Flex,
  Center,
} from "@chakra-ui/react"
import { BsFillCheckCircleFill } from "react-icons/bs"
import { TiWarning } from "react-icons/ti"
import { useContext } from "react"
import { ModalContext } from "../../contexts/modal"
import EssenceMwForm from "../Forms/EssenceMwForm"
import PostForm from "../Forms/PostForm"
import SignupForm from "../Forms/SignupForm"
import SubscribeMwForm from "../Forms/SubscribeMwForm"
import Lottie from "lottie-react"
import confetti from "../../utils/congrats.json"

const ModalContainer = () => {
  const {
    modal,
    modalType,
    modalText,
    handleModal,
  } = useContext(ModalContext)

  const onClose = () => handleModal(null, "")
  // const onOpen = () => setIsOpen(true);

  // const handleOnClick = (event: MouseEvent) => {
  //     const target = event.target as HTMLBoxElement;
  //     if (target.className === "modal") {
  //         handleModal(null, "");
  //     }
  // };

  const render = (type: string | null): any => {
    switch (type) {
      case "success":
        return (
          <Box
            className="modal-success"
            bg="white"
            maxW={"600px"}
          >
            <BsFillCheckCircleFill />
            <Box>
              <strong>Success</strong>:{" "}
              {modalText}
            </Box>

            <Box
              position={"absolute"}
              w="100%"
              right="20%"
              top={0}
            >
              <Center>
                <Lottie
                  animationData={confetti}
                  loop={true}
                />
              </Center>
            </Box>
          </Box>
        )
      case "error":
        return (
          <Box className="modal-error" bg="white">
            <TiWarning />
            <Box>
              <strong>Error</strong>: {modalText}
            </Box>
          </Box>
        )
      case "signup":
        return (
          <Box
            className="modal-signup"
            bg="white"
          >
            <SignupForm />
          </Box>
        )
      case "post":
        return (
          <Box className="modal-post">
            <PostForm />
          </Box>
        )
      case "essence-mw":
        return (
          <Box
            className="modal-essence-mw"
            bg="white"
          >
            <EssenceMwForm />
          </Box>
        )
      case "subscribe-mw":
        return (
          <Box
            className="modal-subscribe-mw"
            bg="white"
          >
            <SubscribeMwForm />
          </Box>
        )
      default:
        return null
    }
  }

  return (
    <Flex
      justifyContent={"center"}
      alignItems="center"
    >
      <Modal isOpen={modal} onClose={onClose}>
        <ModalOverlay
          bg="whiteAlpha.100"
          opacity={0.1}
        />
        <ModalContent
          bg="#000000B3"
          display="flex"
          justifyContent={"center"}
          alignItems="center"
        >
          <ModalCloseButton
            position={"absolute"}
            top={"5%"}
            right={"15%"}
            mt="0px"
            color="white"
            onClick={() => handleModal(null, "")}
          />
          <ModalBody borderRadius={24}>
            {render(modalType)}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  )
}

export default ModalContainer
