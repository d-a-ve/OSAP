import {
  Box,
  Text,
  Heading,
} from "@chakra-ui/react"

export default function ThreadDetail({
  width,
}: {
  width?: string
}) {
  const content =
    " Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum esse consequuntur vitae dolore incidunt expedita, ullam ab aspernatur omnis exercitationem repellat  dolor earum atque obcaecati illo? Ab molestias tenetur eum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro illo eaque provident ut facilis, iste exercitationem repellendus rem eum totam voluptates vitae, ad dolore nihil! Sequi quidem atque magnam explicabo."
  const words = content.split(" ")
  const shortendContent =
    words.length > 30
      ? words.slice(0, 30).join(" ") + "..."
      : content

  return (
    <Box w={width}>
      <Heading size="sm">Segun Adebayo</Heading>


      <Text pt="4px">

        {shortendContent}
        {/* if width is 300px then it is displayed on the popular trends */}
        {
          width !== "300px" && (
            <span
              style={{
                color: "blue",
                fontSize: "12px"
              }}
            >Read more</span>
          )
        }

      </Text>
    </Box>
  )
}
