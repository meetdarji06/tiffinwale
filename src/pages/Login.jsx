import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "@/context/authContext";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(email)
    // console.log(password)
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        setUser(res.data.user);
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  //   const mobileHeightNav = screen.height - window.innerHeight;
  return (
    <div className="flex min-h-screen dark:bg-background items-center justify-center bg-gray-50 md:px-4 md:py-8">
      <Card
        className={`w-full md:max-w-md flex flex-col  p-4 shadow-lg md:rounded-md rounded-none h-screen md:h-full`}
      >
        <CardHeader className="space-y-1 pt-12">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome back
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-12">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="relative flex items-center">
                <Lock className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </div>
            {/* <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm font-normal">
                Remember me for 30 days
              </Label>
            </div> */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </CardContent>
        </form>
        <CardFooter className="flex flex-col space-y-4 pt-10">
          <p className="text-xs text-center text-gray-400 md:hidden">
            Designed & Developed By Meet Darji
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
