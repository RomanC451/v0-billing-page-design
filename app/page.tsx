"use client"

import { useState } from "react"
import { SubscriptionOverview } from "@/components/billing/subscription-overview"
import { PaymentMethod, NoPaymentMethod } from "@/components/billing/payment-method"
import { InvoiceHistory } from "@/components/billing/invoice-history"
import { UsageOverview } from "@/components/billing/usage-overview"
import { PlanManagement } from "@/components/billing/plan-management"
import { BillingDetails } from "@/components/billing/billing-details"
import { PaymentAlert } from "@/components/billing/payment-alert"
import { SecurityFooter } from "@/components/billing/security-footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Demo data — replace with real Stripe data
const DEMO_SUBSCRIPTION = {
  planName: "Pro",
  price: "$19",
  interval: "month",
  nextBillingDate: "March 15, 2026",
  status: "active" as const,
}

const DEMO_PAYMENT = {
  cardBrand: "Visa",
  lastFour: "4242",
  expiryMonth: 8,
  expiryYear: 2027,
  billingName: "Catalin Roman",
  isExpiringSoon: false,
}

const DEMO_INVOICES = [
  { id: "inv_1", date: "Feb 15, 2026", amount: "$19.00", status: "paid" as const, pdfUrl: "#", receiptUrl: "#" },
  { id: "inv_2", date: "Jan 15, 2026", amount: "$19.00", status: "paid" as const, pdfUrl: "#", receiptUrl: "#" },
  { id: "inv_3", date: "Dec 15, 2025", amount: "$19.00", status: "paid" as const, pdfUrl: "#", receiptUrl: "#" },
  { id: "inv_4", date: "Nov 15, 2025", amount: "$19.00", status: "refunded" as const, pdfUrl: "#", receiptUrl: "#" },
  { id: "inv_5", date: "Oct 15, 2025", amount: "$9.00", status: "paid" as const, pdfUrl: "#", receiptUrl: "#" },
]

const DEMO_USAGE = [
  { label: "API Requests", current: 8420, limit: 10000, unit: "requests" },
  { label: "Storage", current: 3.2, limit: 5, unit: "GB" },
  { label: "Team Members", current: 3, limit: 5, unit: "seats" },
]

const DEMO_BILLING_DETAILS = {
  billingAddress: {
    line1: "123 Main Street",
    city: "Bucharest",
    state: "Sector 1",
    postalCode: "010101",
    country: "Romania",
  },
  companyName: "Track Your Life SRL",
  vatId: "RO12345678",
}

// Set to true to preview the past-due payment alert
const SHOW_PAYMENT_ALERT = false

function handleStripePortal() {
  // In production, redirect to Stripe Billing Portal
  // window.location.href = '/api/stripe/portal'
}

export default function BillingPage() {
  const [hasPaymentMethod] = useState(true)

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground text-balance">
            Billing
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your subscription, payment methods, and invoices
          </p>
        </header>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-secondary">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {SHOW_PAYMENT_ALERT && (
              <PaymentAlert
                retryDate="February 20, 2026"
                onUpdatePayment={handleStripePortal}
              />
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SubscriptionOverview
                {...DEMO_SUBSCRIPTION}
                onManageSubscription={handleStripePortal}
              />

              {hasPaymentMethod ? (
                <PaymentMethod
                  {...DEMO_PAYMENT}
                  onUpdatePayment={handleStripePortal}
                />
              ) : (
                <NoPaymentMethod onAddPayment={handleStripePortal} />
              )}
            </div>

            <PlanManagement
              isCanceled={DEMO_SUBSCRIPTION.status === "canceled"}
              onUpgrade={handleStripePortal}
              onDowngrade={handleStripePortal}
              onCancel={handleStripePortal}
              onResume={handleStripePortal}
              onApplyCoupon={handleStripePortal}
            />

            <BillingDetails
              {...DEMO_BILLING_DETAILS}
              onEditDetails={handleStripePortal}
            />
          </TabsContent>

          <TabsContent value="invoices" className="space-y-6">
            <InvoiceHistory
              invoices={DEMO_INVOICES}
              onViewAll={handleStripePortal}
            />
          </TabsContent>

          <TabsContent value="usage" className="space-y-6">
            <UsageOverview
              items={DEMO_USAGE}
              estimatedNextInvoice="$19.00"
            />
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <SecurityFooter />
        </div>
      </div>
    </main>
  )
}
