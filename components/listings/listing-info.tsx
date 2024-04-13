"use client"
import { categories } from "@/data/categories"
import { useCountries } from "@/hooks/use-countries"

import { SafeUser } from "@/types"
import { Avatar } from "../avatar"
import { ListingCategory } from "./listing-category"
import { useMemo } from "react"
import dynamic from "next/dynamic"

interface ListingInfoProps {
  user?: SafeUser | null
  category?: (typeof categories)[0]
  description: string
  roomCount: number
  guestCount: number
  bathroomCount: number
  locationValue: string
}

export const ListingInfo = ({
  user,
  bathroomCount,
  description,
  guestCount,
  locationValue,
  category,
  roomCount,
}: ListingInfoProps) => {
  const { getByValue } = useCountries()

  const coordinates = getByValue(locationValue)?.latlng

  const Map = useMemo(
    () =>
      dynamic(() => import("../map"), {
        ssr: false,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [coordinates] // i
  )

  return (
    <>
      <div className="col-span-4 flex flex-col gap-8 ">
        <div className="flex flex-col gap-2">
          <div className="text-xl font-semibold flex items-center gap-3">
            <span>Hosted by {user?.name}</span>
            <Avatar src={user?.image} />
          </div>

          <div className="flex items-center gap-4 font-light text-neutral-500">
            <span>{guestCount} guests</span>
            <span>{roomCount} rooms</span>
            <span>{bathroomCount} bathrooms</span>
          </div>
        </div>

        <hr />

        {category && (
          <ListingCategory
            icon={category.icon}
            label={category.label}
            description={category.description}
          />
        )}

        <hr />

        <div className="text-lg font-light text-neutral-500">{description}</div>

        <Map center={coordinates} />
      </div>
    </>
  )
}
