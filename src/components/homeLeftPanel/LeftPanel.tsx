import {
  Avatar,
  Box,
  Button,
  Flex,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react"
import { SettingsIcon } from "@chakra-ui/icons"
import { RiGithubFill } from "react-icons/ri"
import AppOptionBtn from "../Buttons/AppOptionBtn"
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
  const {
    address,
    accessToken,
    primaryProfile,
    isMoved,
  }: any = useContext(GlobalContext)

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
    {
      name: "View Source Code",
      link: "https://github.com/d-a-ve/OSAP",
    },
    { name: "Discord", link: "#" },
  ]

  const mappedAppOptions = appOptionsData.map(
    (options, index) => {
      return (
        <AppOptionBtn
          key={index}
          title={options.name}
          link={options.link}
        />
      )
    }
  )

  const moveLeftPanelBy = isMoved ? "0" : "-60%"

  return (
    <Box
      w={["60%", "60%", "20%"]}
      pb="16px"
      bg="white"
      position="fixed"
      left={[
        `${moveLeftPanelBy}`,
        `${moveLeftPanelBy}`,
        "0",
      ]}
      height="100vh"
      zIndex={9999999999999} //warning; this is just a work around, will fix later
      sx={{
        transition: "left 0.3s ease-in",
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

      <LeftPanelBody
        mappedAppOptions={mappedAppOptions}
      />
    </Box>
  )
}
