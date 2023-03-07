import { Flex } from "@chakra-ui/react";
import CenterPanel from "../components/homeCenterPanel/CenterPanel";
import LeftPanel from "../components/homeLeftPanel/LeftPanel";
import RightPanel from "../components/homeRightPanel/RightPanel";

export default function Home() {
  return (
    <Flex position={"fixed"} h="100vh">
      <LeftPanel
      />
      <CenterPanel
      />
      <RightPanel />
    </Flex>

  )
}

