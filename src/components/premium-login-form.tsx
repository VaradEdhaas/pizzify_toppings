"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@nextui-org/react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@nextui-org/shared-icons";
import { Mail, Lock, Smartphone, ArrowRight } from "lucide-react";
import apiService from "@/helper/apiService";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify'
import { useAuth } from "./context/AuthContext";

export function LoginForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { setCurrentUser } = useAuth();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string().required("Password is required")
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      setError("");

      try {
        const response = await apiService.loginUser({
          email: values.email,
          password: values.password
        });

        // You can store token or user in localStorage or context if needed
        // localStorage.setItem("currentUser", JSON.stringify(response));

        // Example: handle AuthContext here if you want
        // setCurrentUser(response);
        toast.success("Welcome to pizzify, logged in successfull")
        setCurrentUser({
          token: response.token,
          user: {
            _id: response.user.id,
            name: response.user.fullname,
            email: response.user.email,
            role: response.user.role,
          }
        });
        router.push("/");
      } catch (err: any) {
        toast.error("An unexpected error occurred. Please try again.")
      } finally {
        setIsLoading(false);
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-8">

      <Input
        name="email"
        type="email"
        placeholder="Enter your email"
        variant="flat"
        startContent={<Mail className="h-4 w-4 mx-3 text-neutral-500" />}
        classNames={{
          base: "w-full",
          mainWrapper: "h-full",
          input: ["bg-transparent", "text-white", "placeholder:text-neutral-500", "text-base", "font-light"],
          inputWrapper: [
            "bg-white/[0.03]",
            "border-white/[0.1]",
            "hover:bg-white/[0.05]",
            "focus:outline-none",
            "focus-visible:outline-none",
            "!cursor-text",
            "h-14",
            "rounded-md",
            "border",
            "p-3",
            "my-0"
          ],
        }}
        disabled={isLoading}
        required
        value={formik.values.email}
        onChange={formik.handleChange}
        isInvalid={formik.touched.email && !!formik.errors.email}
        errorMessage={formik.touched.email && formik.errors.email}
      />

      {/* Password Field */}
      <div className="space-y-3">
        <Input
          name="password"
          placeholder="Enter your password"
          variant="flat"
          startContent={<Lock className="h-4 w-4 mx-3 text-neutral-500" />}
          endContent={
            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
              {isVisible ? (
                <EyeSlashFilledIcon className="text-xl text-neutral-500 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-xl text-neutral-500 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          classNames={{
            base: "w-full",
            mainWrapper: "h-full",
            input: ["bg-transparent", "text-white", "placeholder:text-neutral-500", "text-base", "font-light"],
            inputWrapper: [
              "bg-white/[0.03]",
              "border-white/[0.1]",
              "hover:bg-white/[0.05]",
              "focus:outline-none",
              "focus-visible:outline-none",
              "!cursor-text",
              "h-14",
              "rounded-md",
              "border",
              "p-3",
              "my-0"
            ],
          }}
          disabled={isLoading}
          required
          value={formik.values.password}
          onChange={formik.handleChange}
          isInvalid={formik.touched.password && !!formik.errors.password}
          errorMessage={formik.touched.password && formik.errors.password}
        />

        <div className="text-right">
          <button
            type="button"
            className="text-sm text-neutral-400 hover:text-white transition-colors duration-300 font-light"
          >
            Forgot password?
          </button>
        </div>
      </div>

      {/* Sign In Button */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl">
          <p className="text-sm font-light">{error}</p>
        </div>
      )}

      <Button
        type="submit"
        isLoading={isLoading}
        className="w-full h-14 bg-white text-black rounded-md hover:bg-neutral-100 font-normal transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-base"
        radius="lg"
        endContent={!isLoading && <ArrowRight className="h-4 w-4" />}
      >
        {isLoading ? "Signing in..." : "Sign in"}
      </Button>

      {/* Divider */}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/[0.1]"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-6 bg-white/[0.03] text-neutral-500 font-light rounded-full">or continue with</span>
        </div>
      </div>

      {/* Alternative Options */}
      <div className="space-y-4">
        <Button
          type="button"
          variant="flat"
          className="w-full h-14 bg-white/[0.03] border rounded-md border-white/[0.1] text-white hover:bg-white/[0.05] transition-all duration-300 font-light text-base"
          disabled={isLoading}
          radius="lg"
          startContent={<Smartphone className="h-4 w-4" />}
        >
          Continue with Phone
        </Button>

        <Button
          type="button"
          variant="flat"
          className="w-full h-14 bg-white/[0.03] border rounded-md border-white/[0.1] text-white hover:bg-white/[0.05] transition-all duration-300 font-light text-base"
          disabled={isLoading}
          radius="lg"
        >
          Guest Checkout
        </Button>
      </div>
    </form>
  );
}
