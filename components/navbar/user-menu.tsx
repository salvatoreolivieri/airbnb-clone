"use client"

import { useCallback, useState } from "react"
import { AiOutlineMenu } from "react-icons/ai"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

import { useRegisterModal } from "@/store/use-register-modal"
import { useLoginModal } from "@/store/use-login-modal"
import { useRentModal } from "@/store/use-rent-modal"
import { useNotifications } from "@/hooks/use-notifications"

import { Avatar } from "../avatar"
import { SafeUser } from "@/types"

interface UserMenuProps {
  currentUser?: SafeUser | null
}

interface MenuItemProps {
  onClick?: () => void
  label: string
}

const MenuItem = ({ onClick, label }: MenuItemProps) => {
  return (
    <div
      onClick={onClick}
      className="
        px-4 
        py-3 
        hover:bg-neutral-100 
        transition
        font-semibold
      "
    >
      {label}
    </div>
  )
}

export const UserMenu = ({ currentUser }: UserMenuProps) => {
  const router = useRouter()
  const { onOpen: openRegisterModal } = useRegisterModal()
  const { onOpen: openLoginModal } = useLoginModal()
  const { onOpen: onOpenRentModal } = useRentModal()
  const { addNotificationSuccess, addNotificationError } = useNotifications()

  const [isOpen, setIsOpen] = useState(false)

  const toggleMenuItem = useCallback(() => setIsOpen((value) => !value), [])

  return (
    <>
      <div className="relative">
        <div className="flex flex-row items-center gap-3">
          <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition  cursor-pointer">
            Airbnb your home
          </div>

          <div
            onClick={toggleMenuItem}
            className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
          >
            <AiOutlineMenu />

            <div className="hidden md:block">
              <Avatar src={currentUser?.image} />
            </div>
          </div>
        </div>

        {isOpen && (
          <div
            className="
            absolute 
            rounded-xl 
            shadow-xl
            border-[0.5px]
            w-[40vw]
            md:w-3/4 
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          "
          >
            <div className="flex flex-col cursor-pointer">
              {currentUser ? (
                <>
                  <MenuItem
                    label="My trips"
                    onClick={() => router.push("/trips")}
                  />
                  <MenuItem
                    label="My favorites"
                    onClick={() => router.push("/favorites")}
                  />
                  <MenuItem
                    label="My reservations"
                    onClick={() => router.push("/reservations")}
                  />
                  <MenuItem
                    label="My properties"
                    onClick={() => router.push("/properties")}
                  />
                  <MenuItem
                    label="Airbnb your home"
                    onClick={onOpenRentModal}
                  />
                  <hr />
                  <MenuItem
                    label="Logout"
                    onClick={() =>
                      signOut()
                        .then(() => addNotificationSuccess("logout"))
                        .catch(() => addNotificationError("logout"))
                    }
                  />
                </>
              ) : (
                <>
                  <MenuItem label="Login" onClick={openLoginModal} />
                  <MenuItem label="Sign up" onClick={openRegisterModal} />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
