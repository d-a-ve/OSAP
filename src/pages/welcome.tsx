import { background, Box, Text, Link } from "@chakra-ui/react"
import Intro from "@/components/LandingSections/Intro";
import MarketingMsg from "@/components/LandingSections/MarketingMessage";
import DesignProcess from "@/components/LandingSections/DesignProcess";
import ProductOverview from "@/components/LandingSections/ProductOverview";
import Prototype from "@/components/LandingSections/Prototype";
import UiDesigns from "@/components/LandingSections/UiDesigns";
import Layout from "@/components/Layout";




export default function LandingPage() {



  return (

    <Box color="#414141" bg="black" >
      <Box
        opacity={0.4}
        as="img"
        src="/main2.jpg"
        position={"absolute"}
        h="100vh"
        w="100%"
        objectFit="cover"
      />
      <Box>
        <Intro />
        <Box width="85%" margin="0 auto">
          <MarketingMsg />
          <DesignProcess />
          <Prototype />
          <UiDesigns />
          <ProductOverview />
          <Box pb={16}>
            <Text color="white" fontSize={["sm", "sm", "md"]}>Design and Development by <Link href="">Tinybird</Link>, <Link href="">Dave</Link> & <Link href="">Emmanuel</Link></Text>
          </Box>
        </Box>
      </Box>
    </Box>

  )

}