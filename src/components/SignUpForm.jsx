import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

// UI components
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardDescription } from "@/components/ui/card";

// Schema & Axios
import { signUpSchema } from "../validations/formSchema";
import axios from "../services/axiosInstance";

// Redux Dialog Actions
import {
  closeSignUpDialog,
  openLoginDialog,
} from "@/features/dialog/dialogSlice";

export function SignUpForm() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/auth/register", data);
      console.log("Signed up:", data);
      reset();
      toast.success("Registered successfully!");
      dispatch(closeSignUpDialog());
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error("Failed to register. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto px-3 py-6 sm:px-4">
      <div className="pb-4 flex flex-col gap-1">
        <h2 className="text-2xl font-semibold text-center sm:text-left">
          Signup
        </h2>
        <CardDescription className="text-center sm:text-left text-sm">
          Enter your details below to signup
        </CardDescription>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-4">
          {/* Username */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="username" className="text-sm">
              Username
            </Label>
            <Input
              {...register("username")}
              placeholder="yourusername"
              className="text-sm"
            />
            {errors.username && (
              <p className="text-red-500 text-xs">{errors.username.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="email" className="text-sm">
              Email
            </Label>
            <Input
              {...register("email")}
              placeholder="m@example.com"
              className="text-sm"
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
            Signup
          </Button>
          <Button variant="outline" className="w-full text-sm py-2">
            Login with Google
          </Button>
        </div>

        {/* Already have account */}
        <div className="mt-4 text-center text-xs sm:text-sm">
          Already registered?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              dispatch(closeSignUpDialog());
              dispatch(openLoginDialog());
            }}
            className="underline underline-offset-2"
          >
            Login
          </a>
        </div>
      </form>
    </div>
  );
}
