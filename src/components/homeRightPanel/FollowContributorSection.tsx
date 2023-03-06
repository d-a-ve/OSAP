import ContributorSectionLayout from "./ContriubutorSectionLayout"
import FollowContributorCard from "./FollowContributorCard"

export default function FollowContributorSection() {
  return (
    <ContributorSectionLayout title="Contributors To Follow">
      {/* To maintain UI aesthetics, only two followers should be suggested at a time */}
      <FollowContributorCard />
      <FollowContributorCard />
    </ContributorSectionLayout>
  )
}
