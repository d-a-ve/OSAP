import React, { useEffect, useState } from "react"
import SubscribeBtn from "../Buttons/SubscribeBtn"
import Avatar from "../../components/Avatar"
import { parseURL } from "../../utils/helpers/functions"

const SuggestedProfileCard = ({
  handle,
  avatar,
  metadata,
  profileID,
  isSubscribedByMe,
  owner,
}: any) => {
  const [src, setSrc] = useState(parseURL(avatar))
  const [data, setData] = useState({
    name: "",
    bio: "",
  })

  useEffect(() => {
    if (!metadata) return
    ;(async () => {
      setData({
        name: "",
        bio: "",
      })
      try {
        const res = await fetch(
          parseURL(metadata)
        )
        if (res.status === 200) {
          const data = await res.json()
          setData(data)
        }
      } catch (error) {
        console.error(error)
      }
    })()
  }, [metadata])

  return (
    <div className="panel-profile-card">
      <div
        className="panel-profile-card-img cursor-pointer"
        // onClick={() => router.push(`/u/${owner.address}`)}
      >
        <Avatar value={handle} size={42} />
      </div>
      <div
        className="profile-card-user cursor-pointer"
        //     onClick={() => router.push(`/u/${owner.address}`)}
      >
        <div className="whitespace-nowrap">
          {data.name}
        </div>
        <div>@{handle}</div>
      </div>
      <SubscribeBtn
        profileID={profileID}
        isSubscribedByMe={isSubscribedByMe}
      />
    </div>
  )
}

export default SuggestedProfileCard
