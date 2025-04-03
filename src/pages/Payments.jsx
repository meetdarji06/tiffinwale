import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { MONTHS } from "@/utils/constants";
import { toast } from "sonner";
import axios from "axios";
import Loading from "@/components/Loading";

// Mock payment data for the logged-in user
const PAYMENT_DATA = {
  "2023-03": {
    totalAmount: 3000,
    paidAmount: 3000,
    remainingAmount: 0,
    status: "paid",
  },
  "2023-04": {
    totalAmount: 3200,
    paidAmount: 2000,
    remainingAmount: 1200,
    status: "partial",
  },
  "2023-05": {
    totalAmount: 3500,
    paidAmount: 0,
    remainingAmount: 3500,
    status: "unpaid",
  },
};

// Available months for selection
// const MONTHS = [
//   { value: "2023-03", label: "March 2023" },
//   { value: "2023-04", label: "April 2023" },
//   { value: "2023-05", label: "May 2023" },
// ];

export default function PaymentsPage() {
  const currentMonth = new Date().getMonth() + 1;
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [monthData] = useState(MONTHS.filter((m) => m.value <= currentMonth));
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [monthPaymentData, setMonthPaymentData] = useState(
    paymentData?.find((p) => p.month == selectedMonth) || null
  );

  async function fetchPayments() {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/payments`,
        {
          withCredentials: true, // important if using cookies!
        }
      );

      console.log(res);
      if (res.data.success) {
        setPaymentData(res.data.payments);
      } else {
        setPaymentData([]);
      }
    } catch (error) {
      toast(error.message);
      setPaymentData([]);
    } finally {
      setLoading(false);
    }
  }
  //   console.log(tiffin);
  useEffect(() => {
    fetchPayments();
  }, []);

  useEffect(() => {
    setMonthPaymentData(
      paymentData?.find((p) => p.month == selectedMonth) || null
    );
  }, [selectedMonth, paymentData]);

  // Calculate total outstanding balance from all months
  const totalOutstanding = () => {
    const total = 0;
    paymentData.map(
      (p) => total + (Number(p.totalAmount) - Number(p.paidAmount))
    );

    return total;
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="">
      <div className="flex flex-col md:justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Monthly Payment</h1>

        <div className="mb-6 mt-4">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {monthData.map((month) => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {monthPaymentData ? (
          <>
            {" "}
            <div className="grid gap-6 md:grid-cols-3 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Total Amount</CardTitle>
                  <CardDescription>
                    For{" "}
                    {monthData.find((m) => m.value === selectedMonth)?.label}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    ₹{monthPaymentData.totalAmount}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Paid Amount</CardTitle>
                  <CardDescription>
                    For{" "}
                    {monthData.find((m) => m.value === selectedMonth)?.label}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    ₹{monthPaymentData.paidAmount}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Remaining Amount</CardTitle>
                  <CardDescription>
                    For{" "}
                    {monthData.find((m) => m.value === selectedMonth)?.label}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    ₹
                    {monthPaymentData.totalAmount - monthPaymentData.paidAmount}
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* <div className="mb-6">
              <div className="space-y-4 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    {paymentData.status === "paid" && (
                      <Badge className="bg-green-500">Paid</Badge>
                    )}
                    {paymentData.status === "partial" && (
                      <Badge className="bg-yellow-500">Partially Paid</Badge>
                    )}
                    {paymentData.status === "unpaid" && (
                      <Badge className="bg-red-500">Unpaid</Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {paymentPercentage}% Complete
                  </div>
                </div>
                <div className="px-4">
                  <Progress value={paymentPercentage} className="h-2 " />
                </div>
              </div>
            </div>{" "} */}
          </>
        ) : (
          <div className="my-6 text-center">No data for this month</div>
        )}
      </div>
      {/* <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-xl ml-2 font-bold md:mb-0">My Payment Details</h1>
      </div> */}

      {/* Outstanding Balance Summary */}
      {/* <Card className="mb-6 p-0">
        <CardHeader>
          <CardTitle>Outstanding Balance Summary</CardTitle>
          <CardDescription>
            Your total outstanding balance including all previous months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-medium mb-2">Total Outstanding</h3>
              <div className="text-3xl font-bold text-red-500">
                ₹{totalOutstanding()}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">
                Previous Months Breakdown
              </h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead>Remaining</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {monthData.map((month) => {
                    const monthlyData = PAYMENT_DATA[month.value];
                    const remainingAmount =
                      Number(month.totalAmount) - Number(month.paidAmount);
                    console.log(month.totalAmount);
                    console.log(month.paidAmount);
                    console.log(remainingAmount);
                    return (
                      remainingAmount > 0 && (
                        <TableRow key={month.value}>
                          <TableCell>{month.label}</TableCell>
                          <TableCell>₹{remainingAmount}</TableCell>
                          <TableCell>
                            {monthlyData.status === "paid" && (
                              <Badge className="bg-green-500">Paid</Badge>
                            )}
                            {monthlyData.status === "partial" && (
                              <Badge className="bg-yellow-500">Partial</Badge>
                            )}
                            {monthlyData.status === "unpaid" && (
                              <Badge className="bg-red-500">Unpaid</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      )
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
}
