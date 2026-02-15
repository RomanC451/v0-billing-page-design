"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart3 } from "lucide-react"

interface UsageItem {
  label: string
  current: number
  limit: number
  unit: string
}

interface UsageOverviewProps {
  items: UsageItem[]
  estimatedNextInvoice?: string
}

export function UsageOverview({ items, estimatedNextInvoice }: UsageOverviewProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">Usage & Quota</CardTitle>
            <CardDescription>
              Current usage for this billing period
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {items.map((item) => {
          const percentage = Math.min((item.current / item.limit) * 100, 100)
          const isNearLimit = percentage >= 80
          const isOverLimit = percentage >= 100

          return (
            <div key={item.label} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">{item.label}</span>
                <span className="text-muted-foreground">
                  <span className={isNearLimit ? "text-amber-400" : "text-foreground"}>
                    {item.current.toLocaleString()}
                  </span>{" "}
                  / {item.limit.toLocaleString()} {item.unit}
                </span>
              </div>
              <Progress
                value={percentage}
                className={`h-2 ${isOverLimit ? "[&>div]:bg-red-500" : isNearLimit ? "[&>div]:bg-amber-400" : ""}`}
              />
              {isNearLimit && !isOverLimit && (
                <p className="text-xs text-amber-400">
                  You have used {Math.round(percentage)}% of your quota.
                </p>
              )}
              {isOverLimit && (
                <p className="text-xs text-red-400">
                  You have exceeded your quota. Overage charges may apply.
                </p>
              )}
            </div>
          )
        })}

        {estimatedNextInvoice && (
          <div className="rounded-lg border bg-secondary/50 p-4">
            <p className="text-sm text-muted-foreground">
              Estimated next invoice
            </p>
            <p className="text-xl font-semibold text-foreground">
              {estimatedNextInvoice}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
