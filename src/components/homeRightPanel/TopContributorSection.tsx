import { GlobalContext } from "@/contexts/global"
import { useContext } from "react"
import ContributorSectionLayout from "./ContriubutorSectionLayout"
import TopContributorCard from "./TopContributorCard"

export default function TopContributorSection() {
  const { ranking, address }: any = useContext(GlobalContext)
  const score = [1, 2, 3, 4];

  return (
    <ContributorSectionLayout
      title={"Top Contributors Scoreboard"}
    >
      {ranking && address && (

        ranking.map((x: any, i: number) => (
          <TopContributorCard
            owner={x.owner}
            sn={i + 1}
            votes={i === 3 ? x.totalVotes : 0}
            key={i}

            myScore={i === 3 || x.owner === address ? true : null} rank={i === 3 ? x.position : ""} />
        ))

      )}

      {!ranking || !address && (

        score.map((x: any, i: number) => (
          <TopContributorCard
            owner={""}
            sn={i + 1}
            votes={""}
            key={i}
            myScore={i === 3 ? true : null} rank={"0"} />
        ))

      )}




    </ContributorSectionLayout>
  )
}
