import { background, Box } from "@chakra-ui/react"
import Intro from "@/components/LandingSections/Intro";
import MarketingMsg from "@/components/LandingSections/MarketingMessage";
import DesignProcess from "@/components/LandingSections/DesignProcess";
import ProductOverview from "@/components/LandingSections/ProductOverview";
import Prototype from "@/components/LandingSections/Prototype";
import UiDesigns from "@/components/LandingSections/UiDesigns";


export default function LandingPage() {
  return (
    <Box color="#414141" bg="black"


    >
      <Box
        opacity={0.4}
        as="img"
        src="/main.jpeg"
        position={"absolute"}
        w="100%"
      />
      <Box width="85%" margin="0 auto">
        <Intro />
        <MarketingMsg />
        <DesignProcess />
        <Prototype />
        <UiDesigns />
        <ProductOverview />
      </Box>
    </Box>
  )
}