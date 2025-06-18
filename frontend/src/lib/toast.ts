import { toast } from 'sonner'

const toastClasses = {
  toast: '!bg-popover',
  title: '!text-foreground',
  description: '!text-muted-foreground',
  closeButton:
    '!right-0 !top-3.5 !left-auto !absolute !bg-popover !text-muted-foreground !opacity-50'
}

export function successToast(title: string, message: string = '') {
  toast.success(title, {
    description: message,
    classNames: { ...toastClasses, icon: 'text-green-500' },
    closeButton: true
  })
}

export function errorToast(title: string, messageData?: unknown) {
  let messageText = ''
  if (messageData instanceof Error)
    messageText = messageData.message || 'Unknown error'
  if (typeof messageData === 'string') messageText = messageData
  toast.error(title, {
    description: messageText,
    classNames: { ...toastClasses, icon: 'text-destructive' },
    closeButton: true
  })
}
