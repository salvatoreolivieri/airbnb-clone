"use client"

import qs from "query-string"
import { useSearchModal } from "@/store/use-search-modal"
import { useCallback, useMemo, useState } from "react"
import { Modal } from "./modal"
import { useRouter, useSearchParams } from "next/navigation"
import { Range } from "react-date-range"
import dynamic from "next/dynamic"
import { CountrySelectValue } from "@/hooks/use-countries"
import { formatISO } from "date-fns"
import { Heading } from "../heading"
import { CountrySelect } from "../inputs/country-select"
import { Calendar } from "../inputs/calendar"
import { Counter } from "../inputs/counter"

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

export const SearchModal = () => {
  const router = useRouter()
  const params = useSearchParams()
  const { isOpen, onClose: closeModal } = useSearchModal()

  const [location, setLocation] = useState<CountrySelectValue>()

  const [step, setStep] = useState(STEPS.LOCATION)
  const [guestCount, setGuestCount] = useState(1)
  const [roomCount, setRoomCount] = useState(1)
  const [bathroomCount, setBathroomCount] = useState(1)
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  })

  const Map = useMemo(
    () =>
      dynamic(() => import("../map"), {
        ssr: false,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  )

  const onBack = useCallback(() => setStep((value) => value - 1), [])
  const onNext = useCallback(() => setStep((value) => value + 1), [])

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext()
    }

    let currentQuery = {}

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updateQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    }

    if (dateRange.startDate) {
      updateQuery.startDate = formatISO(dateRange.startDate)
    }

    if (dateRange.endDate) {
      updateQuery.endDate = formatISO(dateRange.endDate)
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updateQuery,
      },
      {
        skipNull: true,
      }
    )

    setStep(STEPS.LOCATION)
    closeModal()
    router.push(url)
  }, [
    location,
    step,
    closeModal,
    guestCount,
    roomCount,
    bathroomCount,
    onNext,
    params,
    dateRange,
    router,
  ])

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Search"
    }

    return "Next"
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined
    }

    return "Back"
  }, [step])

  let bodyContent = (
    <>
      <div className="flex flex-col gap-8">
        <Heading
          title="Where do you wanna go?"
          subtitle="Find the perfect location!"
        />

        <CountrySelect
          value={location}
          onChange={(value) => setLocation(value as CountrySelectValue)}
        />

        <hr />

        <Map center={location?.latlng} />
      </div>
    </>
  )

  if (step === STEPS.DATE) {
    bodyContent = (
      <>
        <div className="flex flex-col gap-8">
          <Heading
            title="When do you plan to go?"
            subtitle="Make sure everyone is free!"
          />

          <Calendar
            value={dateRange}
            onChange={(value) => setDateRange(value.selection)}
          />
        </div>
      </>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More information" subtitle="Find your perfect place!" />

        <Counter
          onChange={(value) => setGuestCount(value)}
          value={guestCount}
          title="Guests"
          subtitle="How many guest are coming?"
        />

        <Counter
          onChange={(value) => setRoomCount(value)}
          value={roomCount}
          title="Rooms"
          subtitle="How many rooms do you need?"
        />

        <Counter
          onChange={(value) => setBathroomCount(value)}
          value={bathroomCount}
          title="Bathrooms"
          subtitle="How many bathrooms do you need?"
        />
      </div>
    )
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        title="Filters"
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
        onClose={closeModal}
        onSubmit={onSubmit}
        body={bodyContent}
      />
    </>
  )
}
