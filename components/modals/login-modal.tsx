"use client"

import { useCallback, useState } from "react"
import { signIn } from "next-auth/react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { FcGoogle } from "react-icons/fc"
import { AiFillGithub } from "react-icons/ai"
import { useRouter } from "next/navigation"

import { useLoginModal } from "@/store/use-login-modal"
import { useRegisterModal } from "@/store/use-register-modal"
import { useNotifications } from "@/hooks/use-notifications"

import { Modal } from "./modal"
import Button from "../button"
import { Heading } from "../heading"
import { Input } from "../inputs/input"

const NOTIFICATION_TYPE = "login"

export const LoginModal = () => {
  const router = useRouter()
  const { onOpen: openRegisterModal } = useRegisterModal()
  const { isOpen, onClose: closeLoginModal } = useLoginModal()
  const { addNotificationSuccess, addNotificationError } = useNotifications()

  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false)

      if (callback?.status === 200) {
        addNotificationSuccess(NOTIFICATION_TYPE)

        router.refresh()
        closeLoginModal()
      } else {
        addNotificationError(NOTIFICATION_TYPE)
      }
    })
  }

  const toggleModal = useCallback(() => {
    closeLoginModal()
    openRegisterModal()
  }, [closeLoginModal, openRegisterModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />

      <Input
        id="email"
        label="Email"
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
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() =>
          signIn("google")
            .then(() => addNotificationSuccess(NOTIFICATION_TYPE))
            .catch(() => addNotificationError(NOTIFICATION_TYPE))
        }
      />

      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() =>
          signIn("github")
            .then(() => addNotificationSuccess(NOTIFICATION_TYPE))
            .catch(() => addNotificationError(NOTIFICATION_TYPE))
        }
      />

      <div
        className="
      text-neutral-500 text-center mt-4 font-light"
      >
        <p className="space-x-1">
          <span>First time using Airbnb?</span>

          <span
            onClick={toggleModal}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >
            Create an account
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
        title="Login"
        actionLabel="Continue"
        onClose={closeLoginModal}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
      />
    </>
  )
}
