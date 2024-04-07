"use client"

import { useRentModal } from "@/store/use-rent-modal"
import { useState } from "react"
import { Modal } from "./modal"

export const RentModal = () => {
  const { isOpen, onClose: closeModal } = useRentModal()
  const [isLoading, setIsLoading] = useState(false)

  const bodyContent = (
    <>
      <div>bodyContent</div>
    </>
  )

  const footerContent = (
    <>
      <div>bodyContent</div>
    </>
  )

  return (
    <>
      <Modal
        disabled={isLoading}
        isOpen={isOpen}
        title="Login"
        actionLabel="Continue"
        onClose={closeModal}
        onSubmit={() => {}}
        body={bodyContent}
        footer={footerContent}
      />
    </>
  )
}
