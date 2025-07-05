import { forwardRef } from "react"
import { cn } from "@/lib/utils"

const Alert = forwardRef(({ className, variant = "default", ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="alert"
      className={cn(
        "relative w-full rounded-lg border p-4",
        {
          "border-red-200 bg-red-50 text-red-900": variant === "destructive",
          "border-gray-200 bg-gray-50 text-gray-900": variant === "default",
        },
        className,
      )}
      {...props}
    />
  )
})
Alert.displayName = "Alert"

const AlertDescription = forwardRef(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />
})
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertDescription }
