import * as React from "react"
import { Toast } from "./toast"

export type ToastOptions = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

export function useToast() {
  const toast = React.useCallback((options: ToastOptions) => {
    console.log("Toast triggered:", options)
  }, [])

  return { toast }
}
