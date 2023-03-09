import { Flex } from "@chakra-ui/react";
import CenterPanel from "../components/homeCenterPanel/CenterPanel";
import LeftPanel from "../components/LeftPanel/LeftPanel";
import RightPanel from "../components/homeRightPanel/RightPanel";
import RightPanelHeader from "../components/homeRightPanel/RightPanelHeader"
import RightPanelBody from "../components/homeRightPanel/RightPanelBody"

export default function Home() {
  return (
    <Flex position={"fixed"} h="100vh">
      <LeftPanel
      />
      <CenterPanel
      />
      <RightPanel panelBody={<RightPanelBody/>} panelHeader={<RightPanelHeader/>} />
    </Flex>

  )
}

