import axios from "axios"
import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react"
import { useNotifications } from "./use-notifications"
import { useLoginModal } from "@/store/use-login-modal"

import type { SafeUser } from "@/types"

interface useFavorite {
  listingId: string
  currentUser?: SafeUser | null
}

export const useFavorite = ({ listingId, currentUser }: useFavorite) => {
  const { addNotificationSuccess, addNotificationError } = useNotifications()
  const { onOpen: openLoginModal } = useLoginModal()
  const router = useRouter()

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || []

    return list.includes(listingId)
  }, [currentUser, listingId])

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()

      if (!currentUser) return openLoginModal()

      try {
        let request

        if (hasFavorited) {
          request = () =>
            axios
              .delete(`/api/favorites/${listingId}`)
              .finally(() => addNotificationSuccess("unfavorited"))
        } else {
          request = () =>
            axios
              .post(`/api/favorites/${listingId}`)
              .finally(() => addNotificationSuccess("favorited"))
        }

        await request()
        router.refresh()
      } catch (error) {
        if (hasFavorited) {
          addNotificationError("unfavorited")
        } else {
          addNotificationError("favorited")
        }
      }
    },
    [
      currentUser,
      hasFavorited,
      listingId,
      router,
      openLoginModal,
      addNotificationSuccess,
      addNotificationError,
    ]
  )

  return {
    hasFavorited,
    toggleFavorite,
  }
}
