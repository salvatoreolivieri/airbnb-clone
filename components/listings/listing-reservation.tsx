"use client"

import { Range } from "react-date-range"
import { Calendar } from "../inputs/calendar"
import Button from "../button"

interface ListingReservationProps {
  price: number
  totalPrice: number
  dateRange: Range
  onChangeDate: (value: Range) => void
  onSubmit: () => void
  disabled?: boolean
  disabledDates: Date[]
}

export const ListingReservation = ({
  onChangeDate,
  price,
  totalPrice,
  onSubmit,
  disabled,
  disabledDates,
  dateRange,
}: ListingReservationProps) => {
  return (
    <>
      <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
        <div className="flex items-center gap-1 p-4">
          <span className="text-2-xl font-semibold">$ {price}</span>
          <span className="font-light text-neutral-600">/ night</span>
        </div>

        <hr />

        <Calendar
          value={dateRange}
          disabledDates={disabledDates}
          onChange={(value) => onChangeDate(value.selection)}
        />

        <hr />

        <div className="p-4">
          <Button disabled={disabled} label="reserve" onClick={onSubmit} />
        </div>

        <hr />

        <div className="p-4 flex items-center justify-between font-semibold text-lg">
          <span>Total</span>

          <span>$ {totalPrice}</span>
        </div>
      </div>
    </>
  )
}
