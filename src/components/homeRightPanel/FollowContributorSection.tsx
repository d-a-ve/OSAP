import { GlobalContext } from "@/contexts/global"
import {
  useContext,
  useEffect,
  useState,
} from "react"
import ContributorSectionLayout from "./ContriubutorSectionLayout"
import FollowContributorCard from "./FollowContributorCard"

export default function FollowContributorSection() {
  const { ranking, address }: any = useContext(
    GlobalContext
  )
  const [suggested, setsSuggested] = useState<
    any | null
  >(null)

  useEffect(() => {
    if (ranking && ranking.length > 0) {
      const filered = ranking.filter(
        (x: any) => x.owner !== address
      )

      setsSuggested(filered.slice(0, 2))
    }
  }, [ranking, address,])

  return (
    <ContributorSectionLayout title="Contributors To Follow">
      {/* To maintain UI aesthetics, only two followers should be suggested at a time */}
      {suggested &&
        suggested.map((x: any, i: number) => (
          <FollowContributorCard
            key={i}
            owner={x["owner"]}
          />
        ))}
    </ContributorSectionLayout>
  )
}
