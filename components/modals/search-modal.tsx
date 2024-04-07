"use client"

import { useSearchModal } from "@/store/use-search-modal"
import { useState } from "react"
import { Modal } from "./modal"

export const SearchModal = () => {
  const { isOpen, onClose: closeModal } = useSearchModal()
  const [isLoading, setIsLoading] = useState(false)

  const bodyContent = (
    <>
      <div>bodyContent</div>
    </>
  )

  const footerContent = (
    <>
      <div>footerContent</div>
    </>
  )

  return (
    <>
      <Modal
        disabled={isLoading}
        isOpen={isOpen}
        title="Search"
        actionLabel="Continue"
        onClose={closeModal}
        onSubmit={() => {}}
        body={bodyContent}
        footer={footerContent}
      />
    </>
  )
}
