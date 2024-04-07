"use client"

import axios from "axios"
import { AiFillGithub } from "react-icons/ai"
// import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"
import { useCallback, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

import { Modal } from "./modal"
import { useRegisterModal } from "@/store/use-register-modal"
import { Heading } from "../heading"
import { Input } from "../inputs/input"
import Button from "../button"
import { useLoginModal } from "@/store/use-login-modal"
import { useNotifications } from "@/hooks/use-notifications"

const NOTIFICATION_TYPE = "registered"

export const RegisterModal = () => {
  const { isOpen, onClose: closeRegisterModal } = useRegisterModal()
  const { onOpen: openLoginModal } = useLoginModal()
  const { addNotificationSuccess, addNotificationError } = useNotifications()

  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    axios
      .post("/api/register", data)
      .then(() => {
        addNotificationSuccess(NOTIFICATION_TYPE)

        closeRegisterModal()
        openLoginModal()
      })
      .catch((error) => addNotificationError(NOTIFICATION_TYPE))
      .finally(() => setIsLoading(false))
  }

  const toggleModal = useCallback(() => {
    closeRegisterModal()
    openLoginModal()
  }, [closeRegisterModal, openLoginModal])

  const bodyContent = (
    <>
      <div className="flex flex-col gap-4">
        <Heading title="Welcome to Airbnb" subtitle="Create an account" />

        <Input
          id="email"
          label="Email"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        <Input
          id="name"
          label="Name"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        <Input
          id="password"
          label="Password"
          type="password"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    </>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {
          addNotificationSuccess(NOTIFICATION_TYPE)
        }}
      />

      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {
          addNotificationError(NOTIFICATION_TYPE)
        }}
      />

      <div
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p className="space-x-1">
          <span>Already have an account?</span>
          <span
            onClick={toggleModal}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  )

  return (
    <>
      <Modal
        disabled={isLoading}
        isOpen={isOpen}
        title="Register"
        actionLabel="Continue"
        onClose={closeRegisterModal}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
      />
    </>
  )
}
