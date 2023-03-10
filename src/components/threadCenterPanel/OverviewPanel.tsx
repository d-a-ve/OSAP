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
  const [data, setData] = useState<IPosts[] | null>(
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
        setData(essence)
      }
    }
  }, [essence])

  return (
    <Box roundedTop="lg" mb="100px">

      {data && data.length > 0 && (
        <Box
          as="img"
          src={
            `${data![0].image_data}`
          }
          w="100%" h="300px" bg="gray.300" />
      )
      }

      {!data || data.length < 1 && (
        <Box
          as="img"
          src={
            `${data![0].image_data}`
          }
          w="100%" h="300px" bg="gray.300" />
      )
      }

      <Box
        p={["0", "0", "5"]}
        pt={["5", "5", "5"]}
      >
        {data && data.length > 0 && (
          <ThreadHeader
            name={data![0].name}
            topic={data![0].description}
            dateCreated={data![0].issue_date}
          />
        )}
        <ThreadBody />
      </Box>
    </Box>
  )
}
