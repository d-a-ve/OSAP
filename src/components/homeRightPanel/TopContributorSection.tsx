import ContributorSectionLayout from "./ContriubutorSectionLayout"
import TopContributorCard from "./TopContributorCard"

export default function TopContributorSection() {
  const scores = [1, 2, 3, 4]

  return (
    <ContributorSectionLayout title="Top Contributors Scoreboard">
      {scores.map((x, i) => (
        <TopContributorCard key={x}
          myScore={i === 3 ? true : null}
        />
      ))}
    </ContributorSectionLayout>
  )
}
