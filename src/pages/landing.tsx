import { Box } from "@chakra-ui/react"
import React from "react"
import { Intro } from "./landing/sections/intro"
import { DesignProcess } from "./landing/sections/designProcess"
import { Prototype } from "./landing/sections/prototype"
import { UiDesigns } from "./landing/sections/uiDesigns"
import { ProductOverview } from "./landing/sections/productOverview"
import { Interaction } from "./landing/sections/interactionFunctionality"
import { MarketingMsg } from "./landing/sections/marketingMsg"

export default function Landing() {
  return (
    <Box color="#414141" bg="#EEF3F7">
      <Box width="85%" margin="0 auto">
        <Intro />
        <MarketingMsg />
        <DesignProcess />
        <Prototype />
        <UiDesigns />
        <ProductOverview />
        <Interaction />
      </Box>
    </Box>
  )
}
