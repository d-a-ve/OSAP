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
import { GlobalContext } from "../../contexts/global"
import { useContext } from "react"

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
  const { isMoved }: any = useContext(
    GlobalContext
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
      w={[isMoved ? "75%" : 0, "20%"]}
      pb="16px"
      bg="white"
      position="fixed"
      height="100vh"
      borderRight={"solid 1px #dadada"}
      zIndex={9999999999999} //warning; this is just a work around, will fix later
      sx={{
        transition: "width 0.3s ease-out",
      }}
    >
      <Box
        as="img"
        src="/circle1.png"
        opacity={0.25}
        h="150vh"
        w="100%"
        left={-50}
        position={"absolute"}
      />

      {!variants?.navigationButton && (
        <LeftPanelBody
          mappedAppOptions={mappedAppOptions}
        />
      )}

      {variants?.navigationButton &&
        (isMoved ? (
          <LeftPanelBody
            mappedAppOptions={mappedAppOptions}
          />
        ) : (
          <VStack spacing="16px" pb="8px">
            <Box
              mt={0}
              h="100vh"
              bg="white"
              borderRight={"1px solid gray"}
              pr={2}
            >
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
              <br />
              <Divider />
              <br />

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
            </Box>
          </VStack>
        ))}
    </Box>
  )
}
