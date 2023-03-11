
import TCenterPanel from "@/components/threadCenterPanel/TCenterPanel";
import { useRouter } from "next/router";


export default function Thread(showSidebar: boolean) {
  const router = useRouter();
  const { id }: any | null = router.query;
  showSidebar = true;

  return (
    // <Layout sides={showSidebar}>
    <TCenterPanel id={id} />

    // </Layout>
  )
}

