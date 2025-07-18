import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const emergencyButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-lg font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-2xl transform active:scale-95",
  {
    variants: {
      variant: {
        emergency: "bg-emergency-red hover:bg-emergency-red-hover active:bg-emergency-red-active text-foreground border-2 border-foreground/20 shadow-emergency-red/50",
        success: "bg-success hover:bg-success/90 text-success-foreground",
        warning: "bg-warning hover:bg-warning/90 text-warning-foreground",
      },
      size: {
        default: "h-12 px-6 py-3",
        large: "h-24 w-24 text-2xl",
        massive: "h-48 w-48 text-4xl",
      },
    },
    defaultVariants: {
      variant: "emergency",
      size: "default",
    },
  }
)

export interface EmergencyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof emergencyButtonVariants> {
  asChild?: boolean
}

const EmergencyButton = React.forwardRef<HTMLButtonElement, EmergencyButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(emergencyButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
EmergencyButton.displayName = "EmergencyButton"

export { EmergencyButton, emergencyButtonVariants }