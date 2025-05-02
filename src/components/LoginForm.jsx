import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "../services/axiosInstance";
import { loginSchema } from "../validations/formSchema";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
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
      console.log("logged in:", data);
      reset();
      toast.success("Logged in successfully!");
      dispatch(closeLoginDialog());
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Failed to login. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6 md:p-8">
      <div className="pb-6 flex flex-col gap-1">
        <h2 className="text-3xl font-bold text-center sm:text-left">Login</h2>
        <CardDescription className="text-center sm:text-left">
          Enter your email below to login  your account
        </CardDescription>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4">
          {/* Email */}
          <div className="grid gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email")}
              placeholder="m@example.com"
              className="outline outline-1 outline-black"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="grid gap-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <a
                href="#"
                className="text-sm text-gray-600 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input {...register("password")} type="password" />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Buttons */}
          <Button type="submit" className="w-full bg-gray-200">
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </div>

        {/* Sign Up Link */}
        <div className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              dispatch(openSignUpDialog());
              dispatch(closeLoginDialog());
            }}
            className="underline underline-offset-4"
          >
            Sign Up
          </a>
        </div>
      </form>
    </div>
  );
}
