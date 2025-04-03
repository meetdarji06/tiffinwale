import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { CreditCard, Search, Plus, ArrowRight } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Mock user data
const MOCK_USERS = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Robert Johnson", email: "robert@example.com" },
  { id: 4, name: "Emily Davis", email: "emily@example.com" },
  { id: 5, name: "Michael Wilson", email: "michael@example.com" },
]

// Mock payment data
const MOCK_PAYMENT_DATA = {
  1: {
    // User ID 1
    "2023-03": {
      totalAmount: 3000,
      paidAmount: 3000,
      remainingAmount: 0,
      status: "paid",
      transactions: [
        { id: 1, date: "2023-03-05", amount: 1500, method: "UPI", note: "First half payment" },
        { id: 2, date: "2023-03-20", amount: 1500, method: "Cash", note: "Second half payment" },
      ],
    },
    "2023-04": {
      totalAmount: 3200,
      paidAmount: 2000,
      remainingAmount: 1200,
      status: "partial",
      transactions: [{ id: 3, date: "2023-04-10", amount: 2000, method: "Bank Transfer", note: "Partial payment" }],
    },
    "2023-05": {
      totalAmount: 3500,
      paidAmount: 0,
      remainingAmount: 3500,
      status: "unpaid",
      transactions: [],
    },
  },
  2: {
    // User ID 2
    "2023-03": {
      totalAmount: 2800,
      paidAmount: 2800,
      remainingAmount: 0,
      status: "paid",
      transactions: [{ id: 4, date: "2023-03-15", amount: 2800, method: "UPI", note: "Full payment" }],
    },
    "2023-04": {
      totalAmount: 3000,
      paidAmount: 3000,
      remainingAmount: 0,
      status: "paid",
      transactions: [{ id: 5, date: "2023-04-05", amount: 3000, method: "Cash", note: "Full payment" }],
    },
    "2023-05": {
      totalAmount: 3200,
      paidAmount: 1600,
      remainingAmount: 1600,
      status: "partial",
      transactions: [{ id: 6, date: "2023-05-10", amount: 1600, method: "UPI", note: "Half payment" }],
    },
  },
  // Add more users as needed
}

// Available months for selection
const MONTHS = [
  { value: "2023-03", label: "March 2023" },
  { value: "2023-04", label: "April 2023" },
  { value: "2023-05", label: "May 2023" },
]

// Payment methods
const PAYMENT_METHODS = [
  { value: "cash", label: "Cash" },
  { value: "upi", label: "UPI" },
  { value: "bank", label: "Bank Transfer" },
  { value: "card", label: "Card" },
]

export default function AdminPayments() {
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedMonth, setSelectedMonth] = useState("2023-05")
  const [searchQuery, setSearchQuery] = useState("")
  const [newPayment, setNewPayment] = useState({
    amount: "",
    method: "cash",
    note: "",
    date: new Date().toISOString().split("T")[0],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Filter users based on search query
  const filteredUsers = MOCK_USERS.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Get payment data for selected user and month
  const paymentData =
    selectedUser &&
    MOCK_PAYMENT_DATA[selectedUser]?.[
      selectedMonth[1]
    ]

  // Calculate total outstanding for selected user
  const calculateTotalOutstanding = (userId) => {
    if (!MOCK_PAYMENT_DATA[userId]) return 0

    return Object.values(MOCK_PAYMENT_DATA[userId]).reduce(
      (total, month) => total + month.remainingAmount,
      0,
    )
  }

  // Handle adding a new payment
  const handleAddPayment = () => {
    if (!selectedUser || !newPayment.amount || Number.parseFloat(newPayment.amount) <= 0) {
      toast({
        title: "Invalid payment",
        description: "Please select a user and enter a valid payment amount.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Prepare payment data for backend
    const paymentData = {
      userId: selectedUser,
      amount: Number.parseFloat(newPayment.amount),
      method: newPayment.method,
      note: newPayment.note,
      date: newPayment.date,
      month: selectedMonth,
    }

    console.log("Payment data to be submitted:", paymentData)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setNewPayment({
        amount: "",
        method: "cash",
        note: "",
        date: new Date().toISOString().split("T")[0],
      })

      toast({
        title: "Payment recorded",
        description: `Payment of ₹${paymentData.amount} recorded for ${MOCK_USERS.find((u) => u.id === selectedUser)?.name}.`,
      })
    }, 1000)
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Payment Management</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
        {/* Left sidebar - User selection */}
        <div className="md:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Select User</CardTitle>
              <CardDescription>Choose a user to manage payments</CardDescription>
              <div className="relative mt-2">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search users..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="max-h-[500px] overflow-y-auto">
              <div className="space-y-2">
                {filteredUsers.map((user) => {
                  const totalOutstanding = calculateTotalOutstanding(user.id)
                  return (
                    <div
                      key={user.id}
                      className={`p-3 rounded-md cursor-pointer transition-colors ${
                        selectedUser === user.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                      }`}
                      onClick={() => setSelectedUser(user.id)}
                    >
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm truncate">{user.email}</div>
                      <div className="text-sm mt-1 flex justify-between items-center">
                        <span>Outstanding:</span>
                        <span className={`font-medium ${totalOutstanding > 0 ? "text-red-500" : ""}`}>
                          ₹{totalOutstanding}
                        </span>
                      </div>
                    </div>
                  )
                })}

                {filteredUsers.length === 0 && (
                  <div className="text-center py-4 text-muted-foreground">No users found</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right content - Payment details and form */}
        <div className="md:col-span-2 lg:col-span-3">
          {selectedUser ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Payment</CardTitle>
                  <CardDescription>
                    Record a new payment for {MOCK_USERS.find((u) => u.id === selectedUser)?.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Payment Amount (₹)</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount"
                        value={newPayment.amount}
                        onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="method">Payment Method</Label>
                      <Select
                        value={newPayment.method}
                        onValueChange={(value) => setNewPayment({ ...newPayment, method: value })}
                      >
                        <SelectTrigger id="method">
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          {PAYMENT_METHODS.map((method) => (
                            <SelectItem key={method.value} value={method.value}>
                              {method.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Payment Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newPayment.date}
                        onChange={(e) => setNewPayment({ ...newPayment, date: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="month">Apply to Month</Label>
                      <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                        <SelectTrigger id="month">
                          <SelectValue placeholder="Select month" />
                        </SelectTrigger>
                        <SelectContent>
                          {MONTHS.map((month) => (
                            <SelectItem key={month.value} value={month.value}>
                              {month.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="note">Note (Optional)</Label>
                      <Input
                        id="note"
                        placeholder="Add a note about this payment"
                        value={newPayment.note}
                        onChange={(e) => setNewPayment({ ...newPayment, note: e.target.value })}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto" onClick={handleAddPayment} disabled={isSubmitting}>
                    <Plus className="mr-2 h-4 w-4" />
                    {isSubmitting ? "Recording Payment..." : "Record Payment"}
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <CardTitle>Payment Details</CardTitle>
                      <CardDescription>
                        Payment history for {MOCK_USERS.find((u) => u.id === selectedUser)?.name}
                      </CardDescription>
                    </div>
                    <Select
                      value={selectedMonth}
                      onValueChange={setSelectedMonth}
                      className="mt-2 sm:mt-0 sm:w-[180px]"
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select month" />
                      </SelectTrigger>
                      <SelectContent>
                        {MONTHS.map((month) => (
                          <SelectItem key={month.value} value={month.value}>
                            {month.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  {paymentData ? (
                    <div className="space-y-6">
                      <div className="grid gap-4 sm:grid-cols-3">
                        <div className="bg-muted p-4 rounded-lg">
                          <div className="text-sm text-muted-foreground">Total Amount</div>
                          <div className="text-2xl font-bold mt-1">₹{paymentData.totalAmount}</div>
                        </div>
                        <div className="bg-muted p-4 rounded-lg">
                          <div className="text-sm text-muted-foreground">Paid Amount</div>
                          <div className="text-2xl font-bold mt-1">₹{paymentData.paidAmount}</div>
                        </div>
                        <div className="bg-muted p-4 rounded-lg">
                          <div className="text-sm text-muted-foreground">Remaining Amount</div>
                          <div
                            className={`text-2xl font-bold mt-1 ${paymentData.remainingAmount > 0 ? "text-red-500" : ""}`}
                          >
                            ₹{paymentData.remainingAmount}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            {paymentData.status === "paid" && <Badge className="bg-green-500">Paid</Badge>}
                            {paymentData.status === "partial" && (
                              <Badge className="bg-yellow-500">Partially Paid</Badge>
                            )}
                            {paymentData.status === "unpaid" && <Badge className="bg-red-500">Unpaid</Badge>}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {Math.round((paymentData.paidAmount / paymentData.totalAmount) * 100)}% Complete
                          </div>
                        </div>
                        <Progress
                          value={Math.round((paymentData.paidAmount / paymentData.totalAmount) * 100)}
                          className="h-2"
                        />
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-3">Transaction History</h3>
                        {paymentData.transactions.length > 0 ? (
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Method</TableHead>
                                <TableHead>Note</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {paymentData.transactions.map((transaction) => (
                                <TableRow key={transaction.id}>
                                  <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                                  <TableCell>₹{transaction.amount}</TableCell>
                                  <TableCell>{transaction.method}</TableCell>
                                  <TableCell>{transaction.note || "-"}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        ) : (
                          <div className="text-center py-6 text-muted-foreground border rounded-md">
                            No transactions found for this month
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No payment data available for this user and month
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="h-full flex items-center justify-center p-8">
              <div className="text-center">
                <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Select a User</h3>
                <p className="text-muted-foreground mb-4">
                  Please select a user from the list to view and manage their payment details.
                </p>
                <ArrowRight className="h-5 w-5 text-muted-foreground mx-auto" />
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
