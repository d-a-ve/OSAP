import { Flex } from "@chakra-ui/react";
import LeftPanel from "@/components/homeLeftPanel/LeftPanel";
import TCenterPanel from "@/components/threadCenterPanel/TCenterPanel";
import { useRouter } from "next/router";
import RightPanel from "@/components/homeRightPanel/RightPanel";
import { GlobalContext } from "@/contexts/global";
import { useContext, useState, useEffect } from "react";

export default function Thread() {
  const router = useRouter();
  const { id }: any = router.query;

  return (
    <Flex position={"fixed"} h="100vh" w="100%">
      <LeftPanel
      />
      {id && (
        <TCenterPanel id={parseInt(id.toString())} />
      )}
      <RightPanel />
    </Flex>

  )
}

