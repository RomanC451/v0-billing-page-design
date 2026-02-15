"use client"

import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface PaymentAlertProps {
  retryDate: string
  onUpdatePayment: () => void
}

export function PaymentAlert({ retryDate, onUpdatePayment }: PaymentAlertProps) {
  return (
    <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4" role="alert">
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <div className="flex items-start gap-3 flex-1">
          <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 shrink-0" />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-amber-300">
              Payment requires attention
            </h4>
            <p className="text-sm text-amber-400/80">
              Your last payment was unsuccessful. We will automatically retry on{" "}
              <span className="font-medium text-amber-300">{retryDate}</span>.
              To avoid any interruption in service, please update your payment
              method.
            </p>
          </div>
        </div>
        <Button
          size="sm"
          onClick={onUpdatePayment}
          className="shrink-0 bg-amber-500 text-amber-950 hover:bg-amber-400"
        >
          Update Payment
        </Button>
      </div>
    </div>
  )
}
