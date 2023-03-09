import { Flex } from "@chakra-ui/react";
import RightPanel from "../components/homeRightPanel/RightPanel";
import LeftPanel from "@/components/homeLeftPanel/LeftPanel";
import TCenterPanel from "@/components/threadCenterPanel/TCenterPanel";

export default function Thread() {
  return (
    <Flex position={"fixed"} h="100vh" w="100%">
      <LeftPanel
      />
      <TCenterPanel />
      <RightPanel />
    </Flex>

  )
}

