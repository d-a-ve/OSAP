import { Button, Flex } from "@chakra-ui/react"
import ContributorData from "./ContributorData"

export default function FollowContributorCard({
  owner,
}: any) {
  return (
    <Flex
      bg="transparent"
      rounded="0"
      align="center"
      justify="space-between"
      p="16px"
      gap="12px"
    >
      <ContributorData owner={owner} i={0} />
      <Button
        color="green.400"
        bg="transparent"
        border="2px"
        borderColor="green.400"
        _hover={{
          bg: "green.400",
          color: "white",
        }}
      >
        Follow
      </Button>
    </Flex>
  )
}
