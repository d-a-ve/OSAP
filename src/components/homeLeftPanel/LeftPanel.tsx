import {
  Avatar,
  Box,
  Divider,
  Flex,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react"
import { SettingsIcon } from "@chakra-ui/icons"
import { RiGithubFill } from "react-icons/ri"
import AppOptionCard from "./AppOptionCard"
import LeftPanelBody from "./leftPanelBody"

const icons = [
  {
    name: "settings",
    icon: <SettingsIcon />,
  },
  {
    name: "github",
    icon: <RiGithubFill />,
  },
]

export default function LeftPanel() {
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

  const appOptionsData = [
    "Settings",
    "View Source Code",
    "Discord",
  ]

  const mappedAppOptions = appOptionsData.map(
    (options, index) => {
      return (
        <AppOptionCard
          key={index}
          title={options}
        />
      )
    }
  )

  return (
    <Box
      w="20%"
      py="16px"
      pos="fixed"
      height="100vh"
      bg="white"
      borderRight={"solid 1px gray"}
      zIndex={"tooltip"}
    >
      {!variants?.navigationButton && (
        <LeftPanelBody
          mappedAppOptions={mappedAppOptions}
        />
      )}

      {variants?.navigationButton && (
        <VStack spacing="16px" pb="8px">
          <>
            <Flex
              flexDirection="column"
              alignItems="center"
              pt="32px"
              w="100%"
            >
              <Box
                bg="yellow"
                w="50px"
                h="50px"
                rounded="full"
              />
            </Flex>
            <Divider />

            {icons.map((x) => (
              <VStack spacing={8} key={x.name}>
                <Avatar
                  w="50px"
                  h="50px"
                  bg="gray"
                  color={"white"}
                  icon={x.icon}
                />
              </VStack>
            ))}
          </>
        </VStack>
      )}
    </Box>
  )
}
