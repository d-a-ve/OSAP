import { Box } from "@chakra-ui/react"
import ThreadHeader from "./ThreadHeader"
import ThreadBody from "./ThreadBody"
import { IPosts } from "@/utils/types"
import { useEffect, useState } from "react"

export default function OverviewPanel({
  essence,
}: {
  essence: any
}) {
  const [data, setData] = useState<IPosts | null>(
    null
  )
  useEffect(() => {
    if (essence && essence.length > 0) {
      const {
        content,
        description,
        image_data,
        tags,
        issue_date,
        name,
        handle,
        bio,
        avatar,
        essenceID,
      }: IPosts = essence

      if (essence) {
        console.log("mineeee", essence)
        setData({
          content,
          description,
          image_data,
          tags,
          issue_date,
          name,
          handle,
          bio,
          avatar,
          essenceID,
        })
      }
    }
  }, [essence])

  return (
    <Box roundedTop="lg" mb="100px">
      <Box w="100%" h="300px" bg="gray.300" />
      <Box
        p={["0", "0", "5"]}
        pt={["5", "5", "5"]}
      >
        {essence && (
          <ThreadHeader
            name={data?.name}
            topic={data?.description}
            dateCreated={data?.issue_date}
          />
        )}
        <ThreadBody />
      </Box>
    </Box>
  )
}
