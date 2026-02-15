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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FileText, Download, ExternalLink } from "lucide-react"

type InvoiceStatus = "paid" | "failed" | "refunded" | "pending"

interface Invoice {
  id: string
  date: string
  amount: string
  status: InvoiceStatus
  pdfUrl: string
  receiptUrl: string
}

interface InvoiceHistoryProps {
  invoices: Invoice[]
  onViewAll: () => void
}

const invoiceStatusConfig: Record<
  InvoiceStatus,
  { label: string; className: string }
> = {
  paid: {
    label: "Paid",
    className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  },
  failed: {
    label: "Failed",
    className: "bg-red-500/15 text-red-400 border-red-500/30",
  },
  refunded: {
    label: "Refunded",
    className: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  },
  pending: {
    label: "Pending",
    className: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  },
}

export function InvoiceHistory({ invoices, onViewAll }: InvoiceHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Invoice History</CardTitle>
              <CardDescription>Your recent billing transactions</CardDescription>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onViewAll} className="text-muted-foreground">
            View all
            <ExternalLink className="ml-1 h-3.5 w-3.5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {invoices.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">
            No invoices yet. Invoices will appear here once you subscribe to a plan.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => {
                const statusInfo = invoiceStatusConfig[invoice.status]
                return (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium text-foreground">
                      {invoice.date}
                    </TableCell>
                    <TableCell className="text-foreground">{invoice.amount}</TableCell>
                    <TableCell>
                      <Badge className={statusInfo.className}>
                        {statusInfo.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          aria-label="Download PDF"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          aria-label="View receipt"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
