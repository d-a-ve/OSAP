import {
  Box,
  Button,
  Text,
  Divider,
  Flex,
  Heading,
  VStack,
  Avatar,
} from "@chakra-ui/react"
import { useContext } from "react"
import { GlobalContext } from "../../contexts/global"
import { ModalContext } from "../../contexts/modal"
import MintProfileBtn from "../Buttons/MintProfile"
import SigninBtn from "../Buttons/SigninBtn"

export default function LeftPanelBody(prop: {
  mappedAppOptions: any
}) {
  const {
    address,
    accessToken,
    primaryProfile,
  }: any = useContext(GlobalContext)

  const { handleModal } = useContext(ModalContext)

  function handleOnClick() {
    handleModal("signup", "")
  }

  const placeholderImage =
    "https://via.placeholder.com/150x150.png?text=Avatar "
  const formatted = address
    ? address.slice(0, 6) +
      "..." +
      address.slice(address.length, 2)
    : ""

  return (
    <>
      <VStack
        spacing="16px"
        pb="8px"
        position={"relative"}
      >
        <Flex
          flexDirection="column"
          alignItems="center"
          pt="32px"
          w="100%"
        >
          <Avatar
            src={
              primaryProfile
                ? primaryProfile.avatar
                : placeholderImage
            }
            bg="gray"
            w="150px"
            h="150px"
          />
          <Flex
            alignItems="center"
            direction="column"
            gap="4px"
            py="16px"
            w="100%"
          >
            <Heading
              fontWeight="bold"
              fontSize="md"
            >
              {primaryProfile
                ? "@" + primaryProfile.handle
                : "Welcome"}
            </Heading>
            <Text
              fontWeight="semibold"
              fontSize="sm"
              fontStyle="italic"
            >
              {formatted}
            </Text>
            {/* This is used to sign a user in, and get personal authToken */}

            {!accessToken && <SigninBtn />}

            {accessToken && !primaryProfile && (
              <Button
                bg={"green.300"}
                _hover={{
                  backgroundColor: "green",
                }}
                color={"white"}
                fontSize="xl"
                w="60%"
                mt="8px"
                onClick={handleOnClick}
                cursor={"pointer"}
              >
                Mint Profile
              </Button>
            )}

            {accessToken && primaryProfile && (
              <Button
                bg={"green.300"}
                _hover={{
                  backgroundColor: "green",
                }}
                color={"white"}
                fontSize="xl"
                w="60%"
                mt="8px"
                cursor={"pointer"}
                //   view profile dialog would appear here
              >
                View Profile
              </Button>
            )}
          </Flex>
        </Flex>
        <Divider />
        <Box w="100%" px="32px" pt="8px">
          {prop.mappedAppOptions}
        </Box>
      </VStack>
    </>
  )
}
