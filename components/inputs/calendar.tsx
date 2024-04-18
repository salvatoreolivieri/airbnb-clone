"use client"

import { DateRange, Range, RangeKeyDict } from "react-date-range"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"

interface CalendarProps {
  disabledDates?: Date[]
  value: Range
  onChange: (value: RangeKeyDict) => void
}

export const Calendar = ({ disabledDates, value, onChange }: CalendarProps) => {
  // Add some functions here...

  return (
    <>
      <DateRange
        onChange={onChange}
        rangeColors={["#262626"]}
        ranges={[value]}
        date={new Date()}
        direction="vertical"
        showDateDisplay={false}
        minDate={new Date()}
        disabledDates={disabledDates}
      />
    </>
  )
}
