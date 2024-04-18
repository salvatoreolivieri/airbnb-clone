"use client"

import { PuffLoader } from "react-spinners"

export const Loader = () => {
  // Add some functions here...

  return (
    <>
      <div className="h-[70vh] flex flex-col items-center justify-center">
        <PuffLoader size={100} color="red" />
      </div>
    </>
  )
}
