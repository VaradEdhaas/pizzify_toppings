"use client"

import { useState, useEffect } from "react"
import { Button, Input, Progress } from "@heroui/react"
import { EyeFilledIcon, EyeSlashFilledIcon } from "@heroui/shared-icons"
import { User, Mail, Phone, Lock, Check, ArrowRight } from "lucide-react"
import { toast } from "react-toastify"
import { Formik, Form, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useAuth } from "./context/AuthContext"
import apiService from "@/helper/apiService"
import { useRouter } from "next/navigation"
import { Checkbox } from "./ui/checkbox"

type SignupFormProps = {
  initialValues: {
    fullname: string
    email: string
    password: string
    phone: string
    address: string
    city: string
    zipcode: string
    marketing: boolean
  }
  onSubmit: (values: SignupFormProps["initialValues"], formikHelpers: { resetForm: () => void }) => Promise<void>
  isUpdateMode?: boolean
}

const SignupSchema = Yup.object().shape({
  fullname: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  phone: Yup.string().required("Phone number is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  zipcode: Yup.string().required("Zipcode is required"),
})

export function SignupForm({ initialValues, onSubmit, isUpdateMode = false }: SignupFormProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const { setCurrentUser } = useAuth()
  const router = useRouter()

  const toggleVisibility = () => setIsVisible(!isVisible)

  const calculatePasswordStrength = (pwd: string) => {
    let strength = 0
    if (pwd.length >= 8) strength += 25
    if (/[A-Z]/.test(pwd)) strength += 25
    if (/[0-9]/.test(pwd)) strength += 25
    if (/[^A-Za-z0-9]/.test(pwd)) strength += 25
    return strength
  }

  const internalSubmit = async (values: SignupFormProps["initialValues"], { resetForm }: { resetForm: () => void }) => {
    if (isUpdateMode) {
      await onSubmit(values, { resetForm })
      return
    }

    setIsLoading(true)
    setError("")
    setSuccess("")
    try {
      const response = await apiService.createUser({
        fullname: values.fullname,
        email: values.email,
        password: values.password,
        phone: values.phone,
        address: values.address,
        city: values.city,
        zipcode: values.zipcode,
      })
      toast.success("Your account has been created successfully")
      setCurrentUser({
        token: response.token,
        user: {
          _id: response.user.id,
          name: response.user.fullname,
          email: response.user.email,
          role: response.user.role,
        },
      })
      resetForm()
      router.push("/")
    } catch (err: any) {
      toast.error("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignupSchema}
      onSubmit={internalSubmit}
      enableReinitialize
    >
      {({ values, handleChange, handleBlur, setFieldValue }) => (
        <Form className="space-y-6">
          {/* Full Name & Phone */}
          <div className="grid grid-cols-2 gap-2 my-0 py-0">
            <Input
              name="fullname"
              placeholder="Full name"
              variant="flat"
              value={values.fullname}
              onChange={handleChange}
              onBlur={handleBlur}
              startContent={<User className="h-4 w-4 mx-3 text-neutral-500" />}
              classNames={inputClassNames}
              disabled={isLoading}
            />
            <Input
              name="phone"
              placeholder="Phone number"
              variant="flat"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              startContent={<Phone className="h-4 w-4 mx-3 text-neutral-500" />}
              classNames={inputClassNames}
              disabled={isLoading}
            />
          </div>

          <div className="flex justify-center w-full gap-3 align-start">
            <ErrorMessage name="fullname" component="div" className="text-sm text-red-400 ml-3" />
            <ErrorMessage name="phone" component="div" className="text-sm text-red-400 ml-3" />
          </div>

          {/* Email & Password */}
          <div className="grid grid-cols-2 gap-2 my-0 py-0">
            <Input
              name="email"
              placeholder="Email address"
              variant="flat"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              startContent={<Mail className="h-4 w-4 mx-3 text-neutral-500" />}
              classNames={inputClassNames}
              disabled={isLoading}
            />
            <Input
              name="password"
              placeholder="Password"
              type={isVisible ? "text" : "password"}
              variant="flat"
              value={values.password}
              onChange={(e) => {
                handleChange(e)
                setPasswordStrength(calculatePasswordStrength(e.target.value))
              }}
              onBlur={handleBlur}
              startContent={<Lock className="h-4 w-4 mx-3 text-neutral-500" />}
              endContent={
                <button type="button" onClick={toggleVisibility} className="focus:outline-none">
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-xl text-neutral-500" />
                  ) : (
                    <EyeFilledIcon className="text-xl text-neutral-500" />
                  )}
                </button>
              }
              classNames={inputClassNames}
              disabled={isLoading}
            />
          </div>

          <div className="flex justify-center w-full gap-3 align-start">
            <ErrorMessage name="email" component="div" className="text-sm text-red-400 ml-3" />
            <ErrorMessage name="password" component="div" className="text-sm text-red-400 ml-3" />
          </div>

          {values.password && (
            <Progress aria-label="Password strength" value={passwordStrength} className="my-2" color="primary" />
          )}

          {/* Address */}
          <Input
            name="address"
            placeholder="Address"
            variant="flat"
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
            classNames={inputClassNames}
            disabled={isLoading}
          />
          <ErrorMessage name="address" component="div" className="text-sm text-red-400 ml-3" />

          {/* City & Zipcode */}
          <div className="grid grid-cols-2 gap-2 my-0 py-0">
            <Input
              name="city"
              placeholder="City"
              variant="flat"
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              classNames={inputClassNames}
              disabled={isLoading}
            />
            <Input
              name="zipcode"
              placeholder="Zipcode"
              variant="flat"
              value={values.zipcode}
              onChange={handleChange}
              onBlur={handleBlur}
              classNames={inputClassNames}
              disabled={isLoading}
            />
          </div>

          <div className="flex justify-center w-full gap-3 align-start">
            <ErrorMessage name="city" component="div" className="text-sm text-red-400 ml-3" />
            <ErrorMessage name="zipcode" component="div" className="text-sm text-red-400 ml-3" />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full h-14 bg-white text-black rounded-md hover:bg-neutral-100 font-normal transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-base"
            radius="lg"
            endContent={!isLoading && <ArrowRight className="h-4 w-4" />}
          >
            {isLoading ? "Processing..." : isUpdateMode ? "Update user" : "Create account"}
          </Button>
        </Form>
      )}
    </Formik>
  )
}

const inputClassNames = {
  base: "w-full",
  mainWrapper: "h-full",
  input: ["bg-transparent", "text-white", "placeholder:text-neutral-500", "text-base", "font-light"],
  inputWrapper: [
    "bg-white/[0.03]", "border-white/[0.1]", "hover:bg-white/[0.05]",
    "focus:outline-none", "focus-visible:outline-none",
    "!cursor-text", "h-14", "rounded-md", "border", "p-3"
  ],
}

const checkboxClassNames = {
  base: "flex items-center gap-2 w-full bg-transparent",
  label: "text-sm text-neutral-400 font-light",
  wrapper:
    "w-4 h-4 shrink-0 border border-white/30 rounded-sm after:bg-white after:text-black after:scale-90",
}
