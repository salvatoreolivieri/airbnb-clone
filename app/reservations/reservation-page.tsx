"use client"

import axios from "axios"

import { useCallback, useState } from "react"

import { useRouter } from "next/navigation"
import { useNotifications } from "@/hooks/use-notifications"

import { SafeReservation, SafeUser } from "@/types"

import { Container } from "@/components/container"
import { Heading } from "@/components/heading"
import { ListingCard } from "@/components/listings/listing-card"

interface ReservationPageProps {
  reservations: SafeReservation[]
  currentUser?: SafeUser | null
}

export const ReservationPage = ({
  reservations,
  currentUser,
}: ReservationPageProps) => {
  const router = useRouter()
  const { addNotificationSuccess, addNotificationError } = useNotifications()

  const [deletingId, setDeletingId] = useState("")

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
        <Heading title="Reservations" subtitle="Booking on your properties" />

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {reservations.map((reservation) => (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              disabled={deletingId === reservation.id}
              actionLabel="Cancel guest reservation"
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </>
  )
}
