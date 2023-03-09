import { Box } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { parseURL } from "../../utils/helpers/functions"
import { IProfileMwCard } from "../../utils/types"

const SubscribeMwCard = ({
  profileID,
  metadata,
  setSelectedProfileId,
  setSelectedProfileHandle,
  setShowDropdown,
}: IProfileMwCard) => {
  const [handle, setHandle] = useState<string>("")

  useEffect(() => {
    if (!metadata) return
    ;(async () => {
      setHandle("")
      try {
        const res = await fetch(
          parseURL(metadata)
        )
        if (res.status === 200) {
          const data = await res.json()
          setHandle(data?.handle)
        }
      } catch (error) {
        console.error(error)
      }
    })()
  }, [metadata])

  const handleOnClick = () => {
    setSelectedProfileId(profileID)
    setSelectedProfileHandle(handle)
    setShowDropdown(false)
  }

  return (
    <Box
      className="subscribe-mw-card"
      onClick={handleOnClick}
    >
      <Box>@{handle}</Box>
    </Box>
  )
}

export default SubscribeMwCard
