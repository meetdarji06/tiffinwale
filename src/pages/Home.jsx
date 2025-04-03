import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { toast } from "sonner";
import Loading from "@/components/Loading";
import { MONTHS } from "@/utils/constants";

// Available months for selection

export default function DashboardPage() {
  const currentMonth = new Date().getMonth() + 1;
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [monthData] = useState(MONTHS.filter((m) => m.value <= currentMonth));
  const [tiffinData, setTiffinData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchTiffins() {
    try {
      setLoading(true);
      const res = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/user/tiffins/${selectedMonth}`,
        {
          withCredentials: true, // important if using cookies!
        }
      );
      if (res.data.success) {
        setTiffinData(res.data.tiffins);
      }
    } catch (error) {
      toast(error.message);
    } finally {
      setLoading(false);
    }
  }
  //   console.log(tiffin);
  useEffect(() => {
    fetchTiffins();
  }, [selectedMonth]);

  // Calculate totals
  const totals = tiffinData.reduce(
    (acc, curr) => {
      return {
        lunchQty: acc.lunchQty + curr.lunchQty,
        dinnerQty: acc.dinnerQty + curr.dinnerQty,
      };
    },
    { lunchQty: 0, dinnerQty: 0 }
  );
  //   console.log(totals);
  return loading ? (
    <Loading />
  ) : (
    <div className="xl:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Dashboard</h1>

        <div className="w-full md:w-auto">
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
      </div>

      {tiffinData.length > 0 ? (
        <>
          <div className="grid gap-6 md:grid-cols-3 mb-6">
            <Card>
              <CardContent className="flex justify-between items-center pt-6 ">
                <div>
                  {" "}
                  <h2>Total Lunch</h2>
                  <CardDescription>
                    For{" "}
                    {monthData.find((m) => m.value === selectedMonth)?.label}
                  </CardDescription>
                </div>
                <div className="text-3xl font-bold">{totals.lunchQty}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex justify-between items-center pt-6 ">
                <div>
                  {" "}
                  <h2>Total Dinner</h2>
                  <CardDescription>
                    For{" "}
                    {monthData.find((m) => m.value === selectedMonth)?.label}
                  </CardDescription>
                </div>
                <div className="text-3xl font-bold">{totals.dinnerQty}</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex justify-between items-center pt-6 ">
                <div>
                  {" "}
                  <h2>Total Meals</h2>
                  <CardDescription>
                    For{" "}
                    {monthData.find((m) => m.value === selectedMonth)?.label}
                  </CardDescription>
                </div>
                <div className="text-3xl font-bold">
                  {totals.lunchQty + totals.dinnerQty}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tiffin Details</CardTitle>
              <CardDescription>
                Daily meal records for{" "}
                {monthData.find((m) => m.value === selectedMonth)?.label}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Lunch</TableHead>
                    <TableHead>Dinner</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tiffinData.map((record) => (
                    <TableRow key={record.date}>
                      <TableCell>
                        {new Date(record.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {record.lunchQty ? (
                          <Badge variant="default" className="bg-green-500">
                            Yes{" "}
                            {record.lunchQty > 1
                              ? "(" + record.lunchQty + ")"
                              : ""}
                          </Badge>
                        ) : (
                          <Badge variant="outline">No</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {record.dinnerQty ? (
                          <Badge variant="default" className="bg-green-500">
                            Yes{" "}
                            {record.dinnerQty > 1
                              ? "(" + record.dinnerQty + ")"
                              : ""}
                          </Badge>
                        ) : (
                          <Badge variant="outline">No</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-center md:text-left">
                        {record.lunchQty + record.dinnerQty}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      ) : (
        <div className="text-center text-xl">No Data Found</div>
      )}
    </div>
  );
}
