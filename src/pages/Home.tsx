
import Layout from "@/components/Layout";
import { Flex } from "@chakra-ui/react";
import CenterPanel from "../components/homeCenterPanel/CenterPanel";
import LeftPanel from "../components/homeLeftPanel/LeftPanel";
import RightPanel from "../components/homeRightPanel/RightPanel";



export default function Home(showSidebar: any) {
  showSidebar = true;

  return (
    // <Layout sides={showSidebar}>
    <CenterPanel
    />
    // </Layout>
  )
}

