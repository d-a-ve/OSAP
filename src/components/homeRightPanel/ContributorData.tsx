/* eslint-disable react-hooks/rules-of-hooks */
import { GlobalContext } from "@/contexts/global"
import { Box, Text, Flex } from "@chakra-ui/react"
import {
  useContext,
  useEffect,
  useState,
} from "react"
import { useCancellableQuery } from "@/hooks/useCancellableQuery"
import { PRIMARY_PROFILE } from "@/utils/graphql"
import { url } from "inspector"

export default function ContributorData({
  owner,
  i,
}: {
  owner: string
  i: number
}) {
  const [profile, setProfile] = useState<
    any | null
  >(null)
  const { address, primaryProfile }: any =
    useContext(GlobalContext)

  let query: any

  const fetchProfile = async () => {
    try {
      /* Fetch primary profile */

      query = useCancellableQuery({
        query: PRIMARY_PROFILE,
        variables: {
          address: owner,
          // chainID: CHAIN_ID,
          myAddress: address,
        },
      })
      const res = await query

      /* Get the primary profile */
      const x =
        res?.data?.address?.wallet?.primaryProfile
      /* Set the primary profile */
      setProfile(x)
    } catch (error) {
      /* Display error message */
      console.error(error)
    }
  }

  useEffect(() => {
    if (address) {
      if (!profile) {
        fetchProfile()
      }
    }
  }, [profile, address, fetchProfile])

  const formatted = owner
    ? owner.slice(0, 6) +
      "..." +
      owner.slice(39, owner.length)
    : ""

  return (
    <>
      {i === 4 &&
        (address && primaryProfile ? (
          <Flex
            alignItems="center"
            gap="8px"
            mr="auto"
          >
            <Box
              width="30px"
              h="30px"
              bg="gray.400"
              rounded="full"
              px="16px"
            />
            <Box>
              <Text
                fontSize={i === 4 ? "lg" : "xs"}
                fontWeight="semibold"
              >
                {i === 4
                  ? "Explorer"
                  : profile
                  ? profile.handle.split("_")[1]
                  : formatted}
              </Text>
              <Text color="brown" fontSize="xs">
                {i === 4
                  ? "your rank"
                  : "Explorer"}
              </Text>
            </Box>
          </Flex>
        ) : (
          <Box />
        ))}

      {i !== 4 && (
        <Flex
          alignItems="center"
          gap="8px"
          mr="auto"
        >
          <Box
            as="div"
            // src={profile ? profile.avatar : null}
            bg={
              address
                ? profile
                  ? `url(${profile.avatar})`
                  : "brown"
                : "gray.400"
            }
            width="30px"
            h="30px"
            sx={{
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            rounded="full"
            px="16px"
          />
          <Box>
            <Text
              fontSize={i === 4 ? "lg" : "xs"}
              fontWeight="semibold"
            >
              {i === 4
                ? "Explorer"
                : profile
                ? profile.handle.split("_")[1]
                : formatted}
            </Text>
            <Text color="brown" fontSize="xs">
              {i === 4 ? "your rank" : "Explorer"}
            </Text>
          </Box>
        </Flex>
      )}
    </>
  )
}
