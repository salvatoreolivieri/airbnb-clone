"use client"

import axios from "axios"

import { Container } from "@/components/container"
import { Heading } from "@/components/heading"

import { SafeListing, SafeUser } from "@/types"

import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import { useNotifications } from "@/hooks/use-notifications"
import { ListingCard } from "@/components/listings/listing-card"

interface PropertiesPageProps {
  listings: SafeListing[]
  currentUser?: SafeUser | null
}

export const PropertiesPage = ({
  listings,
  currentUser,
}: PropertiesPageProps) => {
  const router = useRouter()
  const { addNotificationSuccess, addNotificationError } = useNotifications()

  const [deletingId, setDeletingId] = useState("")

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id)

      axios
        .delete(`/api/listing/${id}`)
        .then(() => {
          addNotificationSuccess("deleteProperty")
          router.refresh()
        })
        .catch(() => addNotificationError("deleteProperty"))
        .finally(() => setDeletingId(""))
    },
    [router, addNotificationSuccess, addNotificationError]
  )

  return (
    <>
      <Container>
        <Heading title="Properties" subtitle="List of your properties" />

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((property) => (
            <ListingCard
              key={property.id}
              data={property}
              actionId={property.id}
              onAction={onCancel}
              disabled={deletingId === property.id}
              actionLabel="Delete property"
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </>
  )
}
