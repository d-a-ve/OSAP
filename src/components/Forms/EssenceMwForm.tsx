import {
  useState,
  MouseEvent,
  ChangeEvent,
  useContext,
  useEffect,
} from "react"
import { useLazyQuery } from "@apollo/client"
import EssenceMwCard from "../Cards/EssenceMwCard"

import {
  BsCaretUpFill,
  BsFillCaretDownFill,
} from "react-icons/bs"
import { GlobalContext } from "../../contexts/global"
import { IEssenceMwCard } from "../../utils/types"
import { ADDRESS } from "../../utils/graphql"
import SetEssenceBtn from "../Buttons/SetEssenceBtn"

const EssenceMwForm = () => {
  const { address, accessToken } = useContext(
    GlobalContext
  )

  /* State variable to store the essences */
  const [essences, setEssences] = useState<
    IEssenceMwCard[]
  >([])

  /* Query to get user information by wallet address */
  const [getAddress] = useLazyQuery(ADDRESS)

  const [showDropdown, setShowDropdown] =
    useState<boolean>(false)

  useEffect(() => {
    if (!(address && accessToken)) return
    ;(async () => {
      /* Get the primary profile for the wallet address */
      const res = await getAddress({
        variables: {
          address: address,
        },
      })
      const primaryProfile =
        res?.data?.address?.wallet?.primaryProfile
      const essences =
        primaryProfile?.essences?.edges?.map(
          (edge: any) => edge?.node
        ) || []

      /* Set the essences */
      setEssences(essences)
    })()
  }, [address, accessToken, getAddress])

  return <></>
}

export default EssenceMwForm
