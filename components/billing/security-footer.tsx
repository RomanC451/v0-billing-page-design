import { Lock, HelpCircle, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SecurityFooter() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-lg border bg-card p-4">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Lock className="h-3.5 w-3.5" />
          <span>Payments securely processed by Stripe</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>We do not store your card details</span>
        </div>
      </div>
      <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
        <HelpCircle className="h-3.5 w-3.5" />
        Need help with billing?
      </Button>
    </div>
  )
}
