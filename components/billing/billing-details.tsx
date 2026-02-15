"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Building2, MapPin, FileCheck } from "lucide-react"

interface BillingDetailsProps {
  billingAddress?: {
    line1: string
    line2?: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  companyName?: string
  vatId?: string
  onEditDetails: () => void
}

export function BillingDetails({
  billingAddress,
  companyName,
  vatId,
  onEditDetails,
}: BillingDetailsProps) {
  const hasDetails = billingAddress || companyName || vatId

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Billing Details</CardTitle>
              <CardDescription>
                Tax and billing address information
              </CardDescription>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={onEditDetails}>
            Edit
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {hasDetails ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {billingAddress && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  Billing Address
                </div>
                <div className="text-sm text-muted-foreground space-y-0.5 pl-6">
                  <p>{billingAddress.line1}</p>
                  {billingAddress.line2 && <p>{billingAddress.line2}</p>}
                  <p>
                    {billingAddress.city}, {billingAddress.state}{" "}
                    {billingAddress.postalCode}
                  </p>
                  <p>{billingAddress.country}</p>
                </div>
              </div>
            )}
            <div className="space-y-4">
              {companyName && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    Company
                  </div>
                  <p className="text-sm text-muted-foreground pl-6">
                    {companyName}
                  </p>
                </div>
              )}
              {vatId && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <FileCheck className="h-4 w-4 text-muted-foreground" />
                    VAT / Tax ID
                  </div>
                  <p className="text-sm text-muted-foreground pl-6">{vatId}</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No billing details on file. Add your billing address and tax
            information for invoicing.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
