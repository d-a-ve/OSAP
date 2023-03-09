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
import LogoutBtn from "../Buttons/LogoutBtn"
import { placeholderImage } from "@/utils/helpers/constants"
import ProfileBtn from "../Buttons/ProfileBtn"

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
            w={[
              "80px",
              "100px",
              "120px",
              "150px",
            ]}
            h={[
              "80px",
              "100px",
              "120px",
              "150px",
            ]}
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
              <ProfileBtn
                handleOnClick={handleOnClick}
                text="Mint Profile"
              />
            )}

            {accessToken && primaryProfile && (
              <ProfileBtn text="View Profile" />
            )}
          </Flex>
        </Flex>
        <Divider />
        <Flex
          direction="column"
          align="center"
          w="100%"
          pt="8px"
        >
          {prop.mappedAppOptions}
          {accessToken && primaryProfile && (
            <LogoutBtn />
          )}
        </Flex>
      </VStack>
    </>
  )
}
