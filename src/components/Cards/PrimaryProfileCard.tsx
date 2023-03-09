import {
  useEffect,
  useState,
  useContext,
} from "react"

import Avatar from "../../components/Avatar"
import { GlobalContext } from "../../contexts/global"
import { parseURL } from "../../utils/helpers/functions"
import { IPrimaryProfileCard } from "../../utils/types"

const PrimaryProfileCard = ({
  handle,
  avatar,
  metadata,
}: IPrimaryProfileCard) => {
  const { address } = useContext(GlobalContext)
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

  const handleLogOut = () => {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <div className="profile-card w-full">
      <div className="profile-card-img center">
        <div>
          <Avatar value={handle} size={80} />
        </div>

        {address && (
          <div className="profile-card-address flex flex-col">
            <div>{`${address.slice(
              0,
              6
            )}..`}</div>
            <button
              className="bg-black text-white rounded-xl w-24 h-8 px-2 py-sm mt-4"
              onClick={handleLogOut}
            >
              Log out
            </button>
          </div>
        )}
      </div>
      <div>
        <div className="account-card-name">
          {data.name}
        </div>
        <div className="account-card-handle">
          @{handle}
        </div>
      </div>
    </div>
  )
}

export default PrimaryProfileCard
