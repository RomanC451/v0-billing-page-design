"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Crown, Calendar, Zap } from "lucide-react"

type SubscriptionStatus =
  | "active"
  | "trialing"
  | "past_due"
  | "canceled"
  | "incomplete"

interface SubscriptionOverviewProps {
  planName: string
  price: string
  interval: string
  nextBillingDate: string
  status: SubscriptionStatus
  trialEndsAt?: string
  onManageSubscription: () => void
}

const statusConfig: Record<
  SubscriptionStatus,
  { label: string; className: string; description?: string }
> = {
  active: {
    label: "Active",
    className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  },
  trialing: {
    label: "Trial",
    className: "bg-sky-500/15 text-sky-400 border-sky-500/30",
    description: "Your trial is active. Upgrade before it ends to keep access.",
  },
  past_due: {
    label: "Past Due",
    className: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    description:
      "Your last payment failed. Please update your payment method.",
  },
  canceled: {
    label: "Canceled",
    className: "bg-red-500/15 text-red-400 border-red-500/30",
    description:
      "Your subscription has been canceled. Access continues until the end of the billing period.",
  },
  incomplete: {
    label: "Incomplete",
    className: "bg-orange-500/15 text-orange-400 border-orange-500/30",
    description: "Your subscription setup is incomplete. Please complete payment.",
  },
}

export function SubscriptionOverview({
  planName,
  price,
  interval,
  nextBillingDate,
  status,
  trialEndsAt,
  onManageSubscription,
}: SubscriptionOverviewProps) {
  const statusInfo = statusConfig[status]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Crown className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Current Plan</CardTitle>
              <CardDescription>Your subscription details</CardDescription>
            </div>
          </div>
          <Badge className={statusInfo.className}>{statusInfo.label}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {statusInfo.description && (
          <p className="text-sm text-amber-400/80 rounded-md bg-amber-500/10 px-3 py-2 border border-amber-500/20">
            {statusInfo.description}
          </p>
        )}

        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-foreground">{planName}</span>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-semibold text-foreground">{price}</span>
          <span className="text-sm text-muted-foreground">/{interval}</span>
        </div>

        <Separator />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              Next billing: <span className="text-foreground">{nextBillingDate}</span>
            </span>
          </div>
          {trialEndsAt && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="h-4 w-4" />
              <span>
                Trial ends: <span className="text-foreground">{trialEndsAt}</span>
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button onClick={onManageSubscription}>Manage Subscription</Button>
          <Button variant="outline" onClick={onManageSubscription}>
            Change Plan
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Your subscription renews automatically. You can cancel anytime.
        </p>
      </CardContent>
    </Card>
  )
}
