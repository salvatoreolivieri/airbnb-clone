"use client"

import { Suspense, useEffect, useState } from "react"

import { RegisterModal } from "@/components/modals/register-modal"
import { LoginModal } from "@/components/modals/login-modal"
import { SearchModal } from "@/components/modals/search-modal"
import { RentModal } from "@/components/modals/rent-modal"

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <RegisterModal />

      <LoginModal />

      <Suspense>
        <SearchModal />
      </Suspense>

      <RentModal />
    </>
  )
}
