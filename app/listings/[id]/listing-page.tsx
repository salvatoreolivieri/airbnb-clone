"use client"

import { Container } from "@/components/container"
import { ListingHead } from "@/components/listings/listing-head"
import { ListingInfo } from "@/components/listings/listing-info"
import { categories } from "@/data/categories"
import { SafeListing, SafeUser } from "@/types"
import { Reservation } from "@prisma/client"
import { useMemo } from "react"

interface ListingPageProps {
  reservation?: Reservation[]
  data: SafeListing & {
    user: SafeUser
  }
  currentUser?: SafeUser | null
}

export const ListingPage = ({
  data,
  reservation,
  currentUser,
}: ListingPageProps) => {
  const category = useMemo(
    () => categories.find((item) => item.label === data.category),
    [data.category]
  )

  return (
    <>
      <Container>
        <div className="max-w-screen-lh mx-auto">
          <div className="flex flex-col gap-6">
            <ListingHead
              title={data.title}
              imageSrc={data.imageSrc}
              locationValue={data.locationValue}
              id={data.id}
              currentUser={currentUser}
            />

            <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
              <ListingInfo
                user={data.user}
                category={category}
                description={data.description}
                roomCount={data.roomCount}
                guestCount={data.guestCount}
                bathroomCount={data.bathroomCount}
                locationValue={data.locationValue}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
