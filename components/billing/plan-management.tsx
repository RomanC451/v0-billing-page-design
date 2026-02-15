"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowUpRight, ArrowDownRight, Pause, XCircle, TicketPercent, Settings } from "lucide-react"

interface PlanManagementProps {
  isCanceled: boolean
  onUpgrade: () => void
  onDowngrade: () => void
  onCancel: () => void
  onResume: () => void
  onApplyCoupon: () => void
}

export function PlanManagement({
  isCanceled,
  onUpgrade,
  onDowngrade,
  onCancel,
  onResume,
  onApplyCoupon,
}: PlanManagementProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Settings className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">Plan Management</CardTitle>
            <CardDescription>
              Change, upgrade, or cancel your subscription
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button variant="outline" className="justify-start" onClick={onUpgrade}>
            <ArrowUpRight className="h-4 w-4" />
            Upgrade Plan
          </Button>
          <Button variant="outline" className="justify-start" onClick={onDowngrade}>
            <ArrowDownRight className="h-4 w-4" />
            Downgrade Plan
          </Button>
          <Button variant="outline" className="justify-start" onClick={onApplyCoupon}>
            <TicketPercent className="h-4 w-4" />
            Apply Promo Code
          </Button>
          {isCanceled ? (
            <Button variant="outline" className="justify-start" onClick={onResume}>
              <Pause className="h-4 w-4" />
              Resume Subscription
            </Button>
          ) : (
            <Button
              variant="outline"
              className="justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10 border-red-500/30"
              onClick={onCancel}
            >
              <XCircle className="h-4 w-4" />
              Cancel Subscription
            </Button>
          )}
        </div>

        <Separator />

        <p className="text-xs text-muted-foreground">
          Changes take effect on your next billing cycle. When canceling, you
          retain access until the end of the current period.
        </p>
      </CardContent>
    </Card>
  )
}
