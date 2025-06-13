"use client"

import { useState } from "react"
import { Button, Input, Checkbox, Progress } from "@nextui-org/react"
import { EyeFilledIcon, EyeSlashFilledIcon } from "@nextui-org/shared-icons"
import { User, Mail, Phone, Lock, Smartphone, ArrowRight, Check } from "lucide-react"
import { signup } from "@/app/signup/actions"

export function SignupForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [isVisible, setIsVisible] = useState(false)
    const [isConfirmVisible, setIsConfirmVisible] = useState(false)
    const [password, setPassword] = useState("")
    const [passwordStrength, setPasswordStrength] = useState(0)

    const toggleVisibility = () => setIsVisible(!isVisible)
    const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible)

    const calculatePasswordStrength = (pwd: string) => {
        let strength = 0
        if (pwd.length >= 8) strength += 25
        if (/[A-Z]/.test(pwd)) strength += 25
        if (/[0-9]/.test(pwd)) strength += 25
        if (/[^A-Za-z0-9]/.test(pwd)) strength += 25
        return strength
    }

    const handlePasswordChange = (value: string) => {
        setPassword(value)
        setPasswordStrength(calculatePasswordStrength(value))
    }

    async function onSubmit(formData: FormData) {
        setIsLoading(true)
        setError("")
        setSuccess("")

        try {
            const result = await signup(formData)
            if (result?.error) {
                setError(result.error)
            } else {
                setSuccess("Welcome to Pizzify! Your account has been created.")
            }
        } catch (error) {
            setError("An unexpected error occurred. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form action={onSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
                <Input
                    name="firstName"
                    placeholder=" First name"
                    variant="flat"
                    startContent={<User className="h-4 w-4 mx-3 text-neutral-500" />}
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
                            "rounded-2xl",
                            "border",
                            "p-3"
                        ],
                    }}
                    disabled={isLoading}
                    required
                />

                <Input
                    name="lastName"
                    placeholder="Last name"
                    variant="flat"
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
                            "rounded-2xl",
                            "border",
                            "p-3"
                        ],
                    }}
                    disabled={isLoading}
                    required
                />
            </div>

            {/* Email Field */}
            <Input
                name="email"
                type="email"
                placeholder=" Email address"
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
                        "rounded-2xl",
                        "border",
                        "p-3"
                    ],
                }}
                disabled={isLoading}
                required
            />

            {/* Phone Field */}
            <Input
                name="phone"
                type="tel"
                placeholder=" Phone number"
                variant="flat"
                startContent={<Phone className="h-4 w-4 mx-3 text-neutral-500" />}
                classNames={{
                    base: "w-full",
                    mainWrapper: "h-full",
                    input: ["bg-transparent", "text-white", "placeholder:text-neutral-500", "text-base", "font-light"],
                    inputWrapper: [
                        "bg-white/[0.03]",
                        "border-white/[0.1]",
                        "hover:bg-white/[0.05]",
                        "!cursor-text",
                        "h-14",
                        "rounded-2xl",
                        "border",
                        "p-3",
                        "focus:outline-none",
                        "focus-visible:outline-none"
                    ],
                }}
                disabled={isLoading}
                required
            />

            {/* Password Field */}
            <div className="space-y-3">
                <Input
                    name="password"
                    placeholder=" Create password"
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
                            "rounded-2xl",
                            "border",
                            "p-3"
                        ],
                    }}
                    onValueChange={handlePasswordChange}
                    disabled={isLoading}
                    required
                />

                {password && (
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-neutral-500 font-light">Password strength</span>
                            <span className="text-neutral-400 font-light">
                                {passwordStrength < 50 ? "Weak" : passwordStrength < 75 ? "Good" : "Strong"}
                            </span>
                        </div>
                        <Progress
                            value={passwordStrength}
                            className="h-2"
                            classNames={{
                                base: "max-w-full",
                                track: "bg-white/[0.1] rounded-full",
                                indicator: "bg-white rounded-full",
                            }}
                        />
                    </div>
                )}
            </div>

            {/* Confirm Password Field */}
            <Input
                name="confirmPassword"
                placeholder=" Confirm password"
                variant="flat"
                startContent={<Lock className="h-4 w-4 mx-3 text-neutral-500" />}
                endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleConfirmVisibility}>
                        {isConfirmVisible ? (
                            <EyeSlashFilledIcon className="text-xl text-neutral-500 pointer-events-none" />
                        ) : (
                            <EyeFilledIcon className="text-xl text-neutral-500 pointer-events-none" />
                        )}
                    </button>
                }
                type={isConfirmVisible ? "text" : "password"}
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
                        "rounded-2xl",
                        "border",
                        "p-3"
                    ],
                }}
                disabled={isLoading}
                required
            />

            {/* Checkboxes */}
            <div className="space-y-4 pt-2">
                <Checkbox
                    name="marketing"
                    classNames={{
                        base: "inline-flex w-full max-w-full bg-transparent hover:bg-transparent items-start",
                        label: "text-sm text-neutral-400 leading-relaxed font-light ml-3",
                        wrapper: "before:border-white/30 after:bg-white after:text-black rounded-lg",
                    }}
                >
                    Send me exclusive offers and menu updates
                </Checkbox>

                <Checkbox
                    name="terms"
                    classNames={{
                        base: "inline-flex w-full max-w-full bg-transparent hover:bg-transparent items-start",
                        label: "text-sm text-neutral-400 leading-relaxed font-light ml-3",
                        wrapper: "before:border-white/30 after:bg-white after:text-black rounded-lg",
                    }}
                    required
                >
                    I agree to the{" "}
                    <a href="/terms" className="text-white hover:text-neutral-300 underline underline-offset-2">
                        Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="text-white hover:text-neutral-300 underline underline-offset-2">
                        Privacy Policy
                    </a>
                </Checkbox>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl">
                    <p className="text-sm font-light">{error}</p>
                </div>
            )}

            {success && (
                <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-2xl flex items-center space-x-3">
                    <Check className="h-4 w-4 flex-shrink-0" />
                    <p className="text-sm font-light">{success}</p>
                </div>
            )}

            {/* Create Account Button */}
            <Button
                type="submit"
                isLoading={isLoading}
                className="w-full h-14 bg-white text-black rounded-md hover:bg-neutral-100 font-normal transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-base"
                radius="lg"
                endContent={!isLoading && <ArrowRight className="h-4 w-4" />}
            >
                {isLoading ? "Creating account..." : "Create account"}
            </Button>

            {/* Divider */}
            <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/[0.1]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-6 bg-white/[0.03] text-neutral-500 font-light rounded-full">or continue with</span>
                </div>
            </div>

            {/* Quick Signup */}
            <Button
                type="button"
                variant="flat"
                className="w-full h-14 bg-white/[0.03] rounded-md border border-white/[0.1] text-white hover:bg-white/[0.05] transition-all duration-300 font-light text-base"
                disabled={isLoading}
                radius="lg"
                startContent={<Smartphone className="h-4 w-4" />}
            >
                Sign up with Phone
            </Button>
        </form>
    )
}
