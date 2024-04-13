import { EmptyState } from "@/components/empty-state"
import { getCurrentUser, getListingById } from "@/lib/utils"
import { ListingPage } from "./listing-page"

export default async function ListinPage({
  params,
}: {
  params: {
    id?: string
  }
}) {
  const page = await getListingById(params)
  const currentUser = await getCurrentUser()

  if (!page) {
    return <EmptyState />
  }

  return (
    <>
      <ListingPage data={page} currentUser={currentUser} />
    </>
  )
}
