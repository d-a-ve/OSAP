import { IPosts } from "@/utils/types"
import {
  Box,
  Card,
  CardBody,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import ThreadDetail from "./ThreadDetail"
import { GlobalContext } from "@/contexts/global";
import { useContext, useEffect, useState } from "react";

export default function ThreadCard(prop: {
  postObj: IPosts
}) {
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

  const { postObj } = prop;
  const router = useRouter();
  const navigate = (path: string) => router.push(path + '/[id]', `${path + '/' + postObj.essenceID}`);




  return (

    <Card
      rounded="0px"
      direction="row"
      variant="outline"
      border="0px"
      borderTop="1px"
      borderColor="gray.100"
      _hover={{ background: "gray.50" }}
      px={!variants?.navigationButton ? 12 : 4}
      onClick={() => navigate("/thread")}
    >
      <Box pt="16px" pl="8px">
        {/* use Avatar component  */}
        <Box
          as="img"
          src={prop.postObj.avatar}
          bg="gray.400"
          rounded="full"
          height="50px"
          width="50px"
        />
      </Box>
      <CardBody>
        <Stack>
          <ThreadDetail postObj={prop.postObj} />

          <Box
            w="100%"
            h="200px"
            bg="gray.400"
            rounded="md"
          />
        </Stack>
      </CardBody>
    </Card>
  )
}
