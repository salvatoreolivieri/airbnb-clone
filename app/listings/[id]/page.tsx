import { EmptyState } from "@/components/empty-state"
import { getCurrentUser, getListingById, getReservations } from "@/lib/utils"
import { ListingPage } from "./listing-page"

const Listing = async ({
  params,
}: {
  params: {
    id?: string
  }
}) => {
  const page = await getListingById(params)
  const reservations = await getReservations(params)
  const currentUser = await getCurrentUser()

  if (!page) {
    return <EmptyState />
  }

  return (
    <>
      <ListingPage
        data={page}
        currentUser={currentUser}
        reservations={reservations}
      />
    </>
  )
}

export default Listing
