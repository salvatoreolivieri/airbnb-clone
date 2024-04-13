"use client"

import { useCountries } from "@/hooks/use-countries"
import { SafeUser } from "@/types"
import { Heading } from "../heading"
import Image from "next/image"
import { HeartButton } from "../heart-button"

interface ListingHeadProps {
  title: string
  imageSrc: string
  locationValue: string
  id: string
  currentUser?: SafeUser | null
}

export const ListingHead = ({
  title,
  imageSrc,
  locationValue,
  id,
  currentUser,
}: ListingHeadProps) => {
  const { getByValue } = useCountries()

  const location = getByValue(locationValue)

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />

      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          alt={title}
          src={imageSrc}
          fill
          className="object-cover w-full"
        />

        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  )
}
