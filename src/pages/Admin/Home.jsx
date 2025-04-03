import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import Loading from "@/components/Loading";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Plus, Minus, Save } from "lucide-react";

function AdminHome() {
  const [tiffinData, setTiffinData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to handle quantity changes
  const handleQuantityChange = (tId, mealType, value) => {
    setTiffinData(
      tiffinData.map((t) => {
        // console.log(t.tiffinQty);
        if (t.id === tId) {
          //   console.log(t.tiffinQty);
          return {
            ...t,
            tiffinQty: {
              ...t.tiffinQty,
              [mealType]: Math.max(0, t.tiffinQty[mealType] + value),
            }, // Ensure quantity doesn't go below 0
          };
        }
        return t;
      })
    );
  };

  // Function to prepare data for backend submission
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      const tiffins = {
        date: date,
        tiffinData: tiffinData.map((tiffin) => ({
          userId: tiffin.id,
          lunchQty: tiffin.tiffinQty.lunchQty,
          dinnerQty: tiffin.tiffinQty.dinnerQty,
        })),
      };

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/tiffin/create`,
        tiffins,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Tiffin Update Successfully");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  async function fetchTiffinData() {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/tiffin/${date}`,
        {
          withCredentials: true, // important if using cookies!
        }
      );
      //   console.log(res);
      if (res.data.success) {
        setTiffinData(res.data.tiffins);
      } else {
        setTiffinData([]);
      }
    } catch (err) {
      toast.error(err.message);
      setTiffinData([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTiffinData();
  }, [date]);

  return loading ? (
    <Loading />
  ) : (
    tiffinData && (
      <>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Select Date
            </CardTitle>
            <CardDescription>
              Choose a date to manage tiffin quantities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tiffin Quantities</CardTitle>
            <CardDescription>
              Manage lunch and dinner quantities for{" "}
              {new Date(date).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead className="text-center">Lunch Quantity</TableHead>
                  <TableHead className="text-center">Dinner Quantity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tiffinData.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="text-xs md:text-base md:font-medium">
                      {t.name}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            handleQuantityChange(t.id, "lunchQty", -1)
                          }
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 md:w-12 text-center">
                          {t.tiffinQty.lunchQty}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            handleQuantityChange(t.id, "lunchQty", 1)
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            handleQuantityChange(t.id, "dinnerQty", -1)
                          }
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 md:w-12 text-center">
                          {t.tiffinQty.dinnerQty}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            handleQuantityChange(t.id, "dinnerQty", 1)
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-items-end">
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>
      </>
    )
  );
}

export default AdminHome;
