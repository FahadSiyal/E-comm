import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

// Components from your UI library
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardDescription } from "@/components/ui/card";

// Form validation schema
import { loginSchema } from "../validations/formSchema";

// Axios instance for API calls
import axios from "../services/axiosInstance";

// Redux actions
import {
  closeLoginDialog,
  openSignUpDialog,
} from "@/features/dialog/dialogSlice";

export function LoginForm() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/auth/login", data);
      console.log("Logged in:", data);
      reset();
      toast.success("Logged in successfully!");
      dispatch(closeLoginDialog());
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Failed to login. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto px-3 py-6 sm:px-4">
      <div className="pb-4 flex flex-col gap-1">
        <h2 className="text-2xl font-semibold text-center sm:text-left">
          Login
        </h2>
        <CardDescription className="text-center sm:text-left text-sm">
          Enter your email below to login to your account
        </CardDescription>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="email" className="text-sm">
              Email
            </Label>
            <Input
              {...register("email")}
              placeholder="m@example.com"
              className="outline outline-1 outline-black text-sm"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <Label htmlFor="password" className="text-sm">
                Password
              </Label>
              <a
                href="#"
                className="text-xs text-gray-600 hover:underline"
              >
                Forgot?
              </a>
            </div>
            <Input
              {...register("password")}
              type="password"
              className="text-sm"
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          {/* Buttons */}
          <Button type="submit" className="w-full bg-gray-200 text-sm py-2">
            Login
          </Button>
          <Button variant="outline" className="w-full text-sm py-2">
            Login with Google
          </Button>
        </div>

        {/* Sign Up Link */}
        <div className="mt-4 text-center text-xs sm:text-sm">
          Don't have an account?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              dispatch(openSignUpDialog());
              dispatch(closeLoginDialog());
            }}
            className="underline underline-offset-2"
          >
            Sign Up
          </a>
        </div>
      </form>
    </div>
  );
}
