import { GlobalContext } from "@/contexts/global"
import { ModalContext } from "@/contexts/modal"
import { IPosts } from "@/utils/types"
import {
  Box,
  Text,
  Card,
  CardBody,
  Textarea,
  Flex,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Avatar,
  useToast,
} from "@chakra-ui/react"
import {
  ChangeEvent,
  useContext,
  useEffect,
  useState,
} from "react"
import {
  BiGlobe,
  BiGlobeAlt,
} from "react-icons/bi"
import { BsFillPeopleFill } from "react-icons/bs"
import {
  RiImageAddFill,
  RiVideoAddFill,
} from "react-icons/ri"
import { placeholderImage } from "@/utils/helpers/constants"

export default function CreateThread() {
  const {
    imageURL,
    setimageURL,
    postInput,
    primaryProfile,
    setPostInput,
  } = useContext(GlobalContext)

  const handleOnChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const name = event.target.name
    const value = event.target.value
    setPostInput({
      ...postInput,
      [name]: value,
    })
  }

  const [control, setControl] = useState(0)
  const { handleModal }: any =
    useContext(ModalContext)
  const toast = useToast();

  const controls = [
    {
      id: 0,
      title: "Everybody",
      icon: (
        <BiGlobe
          fontSize={"8px"}
          color={control === 0 ? "green" : "gray"}
        />
      ),
    },

    {
      id: 1,
      title: "People I follow",
      icon: (
        <BsFillPeopleFill
          fontSize={"8px"}
          color={control === 1 ? "green" : "gray"}
        />
      ),
    },
  ]

  useEffect(() => {
    if (postInput.content.length > 5) {
      //it's time to open a dialog

      handleModal("post", "Profile was created!")
    }
  }, [postInput.content, handleModal])

  function handlePost() {
    toast({
      title: "Disabled by Admin, please try again later!",
      status: "info",
      duration: 2000,
    });
    return;
    handleModal("post", "Profile was created!")
  }

  return (
    <Card rounded="0px" direction="row" px={12}>
      <Box
        // bg="red"
        as="img"
        src="/triangle.png"
        opacity={0.15}
        top={"0rem"}
        left={0}
        h="13vh"
        w="100%"
        zIndex={0}
        position={"absolute"}
      />

      <Box pt="16px" pl="8px">
        {/* use Avatar component  */}
        <Avatar
          src={
            primaryProfile
              ? primaryProfile.avatar
              : placeholderImage
          }
          bg="gray"
          w={["60px"]}
          h={["60px"]}
        />
      </Box>
      <CardBody>
        <Box w="">
          <Textarea
            name="description"
            value={postInput.description}
            placeholder="Have you discovered a new challenge?"
            rows={3}
            w="100%"
            resize="none"
            variant="flushed"
            size="lg"
            onChange={handleOnChange}
          />

          <Flex
            align="center"
            justify="space-between"
            mt="8px"
            px="8px"
          >
            <HStack
              spacing={5}
              color="green"
              alignItems="center"
              fontSize={"xl"}
            >
              <RiImageAddFill />
              <RiVideoAddFill />
            </HStack>

            <Box
              display={"flex"}
              alignItems="center"
            >
              {postInput.description.length >
                1 && (
                  <>
                    <Menu>
                      <MenuButton
                      //zIndex={2}
                      >
                        <Box
                          display="flex"
                          color="green.300"
                          borderRadius={"25px"}
                          bg="whitesmoke"
                          alignItems={"center"}
                          py={2}
                          px={4}
                          mr={4}
                        >
                          {controls[control].icon}
                          &nbsp; Visible to &nbsp;
                          <span>
                            {controls[
                              control
                            ].title.toLowerCase()}
                          </span>
                        </Box>
                      </MenuButton>
                      <MenuList>
                        {controls.map(
                          (x: any, i: number) => (
                            <MenuItem
                              w="100%"
                              key={i}
                              onClick={() =>
                                setControl(i)
                              }
                              bg={
                                i === control
                                  ? "whitesmoke"
                                  : "transparent"
                              }
                              color={
                                i === control
                                  ? "green"
                                  : "gray"
                              }
                            >
                              {x.icon} {x.title}
                            </MenuItem>
                          )
                        )}
                      </MenuList>
                    </Menu>
                  </>
                )}

              <Button
                bg="green.300"
                _hover={{
                  backgroundColor: "green.400",
                }}
                textColor="white"
                fontSize="md"
                onClick={handlePost}
              >
                POST
              </Button>
            </Box>
          </Flex>
        </Box>
      </CardBody>
    </Card>
  )
}
