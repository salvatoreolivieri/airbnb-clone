import { EmptyState } from "@/components/empty-state"
import { getCurrentUser, getReservations } from "@/lib/utils"
import { ReservationPage } from "./reservation-page"

const Reservations = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  })

  if (!reservations.length) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Look like you have no reservation on your property"
      />
    )
  }

  return (
    <>
      <ReservationPage reservations={reservations} currentUser={currentUser} />
    </>
  )
}

export default Reservations
