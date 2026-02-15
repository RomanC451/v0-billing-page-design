"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CreditCard, AlertTriangle } from "lucide-react"

interface PaymentMethodProps {
  cardBrand: string
  lastFour: string
  expiryMonth: number
  expiryYear: number
  billingName: string
  isExpiringSoon: boolean
  onUpdatePayment: () => void
}

export function PaymentMethod({
  cardBrand,
  lastFour,
  expiryMonth,
  expiryYear,
  billingName,
  isExpiringSoon,
  onUpdatePayment,
}: PaymentMethodProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <CreditCard className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">Payment Method</CardTitle>
            <CardDescription>Your default payment method</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isExpiringSoon && (
          <div className="flex items-center gap-2 rounded-md bg-amber-500/10 px-3 py-2 border border-amber-500/20">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <p className="text-sm text-amber-400">
              Your card is expiring soon. Please update your payment method.
            </p>
          </div>
        )}

        <div className="flex items-center gap-4 rounded-lg border bg-secondary/50 p-4">
          <div className="flex h-12 w-16 items-center justify-center rounded-md bg-muted">
            <CreditCard className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium text-foreground">
              {cardBrand} ending in {lastFour}
            </p>
            <p className="text-xs text-muted-foreground">
              Expires {String(expiryMonth).padStart(2, "0")}/{expiryYear} &middot; {billingName}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onUpdatePayment}>
            Update Payment Method
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function NoPaymentMethod({ onAddPayment }: { onAddPayment: () => void }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <CreditCard className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">Payment Method</CardTitle>
            <CardDescription>No payment method on file</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Add a payment method to upgrade your plan and access premium features.
        </p>
        <Button onClick={onAddPayment}>Add Payment Method</Button>
      </CardContent>
    </Card>
  )
}
