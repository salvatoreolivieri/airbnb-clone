"use client"

import axios from "axios"

import { Container } from "@/components/container"
import { Heading } from "@/components/heading"

import { SafeReservation, SafeUser } from "@/types"

import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import { useNotifications } from "@/hooks/use-notifications"
import { ListingCard } from "@/components/listings/listing-card"

interface TripPageProps {
  reservations: SafeReservation[]
  currentUser?: SafeUser | null
}

export const TripPage = ({ reservations, currentUser }: TripPageProps) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState("")
  const { addNotificationSuccess, addNotificationError } = useNotifications()

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id)

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          addNotificationSuccess("deleteReservation")
          router.refresh()
        })
        .catch(() => addNotificationError("deleteReservation"))
        .finally(() => setDeletingId(""))
    },
    [router, addNotificationSuccess, addNotificationError]
  )

  return (
    <>
      <Container>
        <Heading
          title="Trips"
          subtitle="Where you've been and where you are going"
        />

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {reservations.map((reservation) => (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              disabled={deletingId === reservation.id}
              actionLabel="Cancel reservation"
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </>
  )
}
