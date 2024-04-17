"use client"

import axios from "axios"
import { Container } from "@/components/container"
import { ListingHead } from "@/components/listings/listing-head"
import { ListingInfo } from "@/components/listings/listing-info"
import { categories } from "@/data/categories"
import { useLoginModal } from "@/store/use-login-modal"
import { SafeListing, SafeReservation, SafeUser } from "@/types"
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useNotifications } from "@/hooks/use-notifications"
import { ListingReservation } from "@/components/listings/listing-reservation"
import { Range } from "react-date-range"

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
}

interface ListingPageProps {
  reservations?: SafeReservation[]
  data: SafeListing & {
    user: SafeUser
  }
  currentUser?: SafeUser | null
}

export const ListingPage = ({
  data,
  reservations = [],
  currentUser,
}: ListingPageProps) => {
  const { onOpen: openLoginModal } = useLoginModal()
  const { addNotificationSuccess, addNotificationError } = useNotifications()
  const router = useRouter()

  const disabledDates = useMemo(() => {
    let dates: Date[] = []

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      })

      dates = [...dates, ...range]
    })

    return dates
  }, [reservations])

  const [isLoading, setIsLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(data.price)
  const [dateRange, setDateRange] = useState<Range>(initialDateRange)

  const onCreateReservation = useCallback(() => {
    if (!currentUser) return openLoginModal()

    setIsLoading(true)

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: data?.id,
      })
      .then(() => {
        addNotificationSuccess("dateReservation")

        setDateRange(initialDateRange)

        // Redirect to trips:
        router.push("/trips")
      })
      .catch(() => addNotificationError("dateReservation"))
      .finally(() => setIsLoading(false))
  }, [
    currentUser,
    data,
    openLoginModal,
    totalPrice,
    dateRange,
    addNotificationSuccess,
    addNotificationError,
    router,
  ])

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      )

      if (dayCount && data.price) {
        setTotalPrice(dayCount * data.price)
      } else {
        setTotalPrice(data.price)
      }
    }
  }, [data, dateRange])

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

              <div className="order-first mb-10 md:order-last md:col-span-3">
                <ListingReservation
                  price={data.price}
                  totalPrice={totalPrice}
                  dateRange={dateRange}
                  onChangeDate={(value) => {
                    console.log("setDateRange: ", value)
                    setDateRange(value)
                  }}
                  onSubmit={onCreateReservation}
                  disabled={isLoading}
                  disabledDates={disabledDates}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
