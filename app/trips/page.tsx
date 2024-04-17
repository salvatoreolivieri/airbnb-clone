import { EmptyState } from "@/components/empty-state"
import { getCurrentUser, getReservations } from "@/lib/utils"
import { TripPage } from "./trip-page"

export default async function TripsPage() {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />
  }

  const reservations = await getReservations({
    userId: currentUser.id,
  })

  if (!reservations.length) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="Look like you havent reserved any trips"
      />
    )
  }

  return (
    <>
      <TripPage reservations={reservations} currentUser={currentUser} />
    </>
  )
}
