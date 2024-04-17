import { toast } from "sonner"

type NotificationType =
  | "registered"
  | "login"
  | "logout"
  | "listingCreated"
  | "unfavorited"
  | "favorited"
  | "dateReservation"
  | "deleteReservation"

type NotificationMessages = {
  [key in NotificationType]: {
    success: string
    error: string
  }
}

const notificationMessages: NotificationMessages = {
  registered: {
    success: "Successfully registered",
    error: "Failed to registered",
  },
  login: {
    success: "Successfully loggedIn",
    error: "Failed to login",
  },
  logout: {
    success: "Successfully logged out",
    error: "Failed to logout",
  },
  listingCreated: {
    success: "Listing Created!",
    error: "Failed to create listing",
  },
  favorited: {
    success: "Added to favorites!",
    error: "Failed to add to favorite listing",
  },
  unfavorited: {
    success: "Removed from favorites!",
    error: "Failed to unfavorite",
  },
  dateReservation: {
    success: "Reservation success",
    error: "Reservation failed",
  },
  deleteReservation: {
    success: "Reservation cancelled",
    error: "Can't cancel reservation, contact the bnb",
  },
}

export const useNotifications = () => {
  const addNotification = (type: NotificationType, isSuccess: boolean) => {
    const messageType = isSuccess ? "success" : "error"

    const message = notificationMessages[type][messageType]

    toast[messageType](message)
  }

  const addNotificationSuccess = (type: NotificationType) =>
    addNotification(type, true)

  const addNotificationError = (type: NotificationType) =>
    addNotification(type, false)

  return { addNotificationSuccess, addNotificationError }
}
