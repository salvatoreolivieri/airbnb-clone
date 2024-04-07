"use client"

import { useLoginModal } from "@/store/use-login-modal"
import { useState } from "react"
import { Modal } from "./modal"

export const LoginModal = () => {
  const { isOpen, onClose: closeModal } = useLoginModal()
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
