import { toast } from "sonner"

type NotificationType = "registered"

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
