import { IPosts } from "@/utils/types"
import {
  Box,
  Text,
  Heading,
} from "@chakra-ui/react"

export default function ThreadDetail({
  postObj,
  width,
}: {
  width?: string,
  postObj: IPosts
}) {
  const content = postObj?.description;
  const words = content ? content.split(" ") : [" "];
  const shortendContent =
    words.length > 30
      ? words.slice(0, 30).join(" ") + "..."
      : content

  return (
    <Box w={width}>
      <Heading size="sm">{postObj?.name}</Heading>
      <Text fontSize={"xs"}>@{postObj?.handle}</Text>

      <Text pt="4px" fontSize={"14px"}>
        {shortendContent}
        {/* if width is 300px then it is displayed on the popular trends */}
        {width !== "300px" && words.length > 30 && (
          <span
            style={{
              color: "blue",
              fontSize: "12px",
            }}
          >
            &nbsp; Read more
          </span>
        )}
      </Text>
    </Box>
  )
}
