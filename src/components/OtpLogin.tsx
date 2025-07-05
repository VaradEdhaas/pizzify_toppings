"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@heroui/react";
import { Smartphone, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "./context/AuthContext";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "./lib/firebase-config";

export function PhoneLoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState<"PHONE" | "OTP">("PHONE");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [confirmationResult, setConfirmationResult] = useState<any>(null);
    const router = useRouter();
    const { setCurrentUser } = useAuth();

    useEffect(() => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
                size: "normal",
                callback: () => {
                    console.log("Recaptcha verified");
                },
            });
            window.recaptchaVerifier.render();
        }
    }, []);

    const formik = useFormik({
        initialValues: {
            phone: "",
        },
        validationSchema: Yup.object({
            phone: Yup.string()
                .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")
                .required("Phone number is required"),
        }),
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                const fullPhone = `+91${values.phone}`;
                setPhoneNumber(fullPhone);

                const confirmation = await signInWithPhoneNumber(
                    auth,
                    fullPhone,
                    window.recaptchaVerifier
                );

                setConfirmationResult(confirmation);
                setStep("OTP");
                toast.success("OTP sent successfully");
            } catch (err: any) {
                toast.error(err.message || "Failed to send OTP");
                window.recaptchaVerifier.clear();
            } finally {
                setIsLoading(false);
            }
        },
    });

    const handleVerifyOtp = async () => {
        if (!confirmationResult) return;
        setIsLoading(true);
        try {
            await confirmationResult.confirm(otp);

            // You can now fetch user info or save to your backend
            toast.success("OTP verified!");
            setCurrentUser({
                token: "firebase-phone-dummy-token",
                user: {
                    _id: "firebase-user-id",
                    name: "Phone User",
                    role: "user",
                    phone: phoneNumber,
                },
            });
            router.push("/");
        } catch (error) {
            toast.error("Invalid OTP");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={step === "PHONE" ? formik.handleSubmit : (e) => e.preventDefault()}
            className="space-y-8"
        >
            {/* reCAPTCHA placeholder */}
            <div id="recaptcha-container"></div>

            {step === "PHONE" && (
                <>
                    <Input
                        name="phone"
                        type="tel"
                        placeholder="Enter your mobile number"
                        variant="flat"
                        startContent={<Smartphone className="h-4 w-4 mx-3 text-neutral-500" />}
                        classNames={{
                            base: "w-full",
                            mainWrapper: "h-full",
                            input: [
                                "bg-transparent",
                                "text-white",
                                "placeholder:text-neutral-500",
                                "text-base",
                                "font-light",
                            ],
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
                                "my-0",
                            ],
                        }}
                        disabled={isLoading}
                        required
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        isInvalid={formik.touched.phone && !!formik.errors.phone}
                        errorMessage={formik.touched.phone && formik.errors.phone}
                    />

                    <Button
                        type="submit"
                        isLoading={isLoading}
                        className="w-full h-14 bg-white text-black rounded-md hover:bg-neutral-100 font-normal transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-base"
                        radius="lg"
                        endContent={!isLoading && <ArrowRight className="h-4 w-4" />}
                    >
                        {isLoading ? "Sending OTP..." : "Send OTP"}
                    </Button>
                </>
            )}

            {step === "OTP" && (
                <>
                    <p className="text-white text-sm">
                        Enter the 6-digit OTP sent to {phoneNumber}
                    </p>

                    <InputOTP
                        maxLength={6}
                        value={otp}
                        onChange={setOtp}
                        containerClassName="justify-center"
                    >
                        <InputOTPGroup>
                            {[...Array(6)].map((_, i) => (
                                <InputOTPSlot key={i} index={i} />
                            ))}
                        </InputOTPGroup>
                    </InputOTP>

                    <Button
                        onPress={handleVerifyOtp}
                        isLoading={isLoading}
                        disabled={otp.length < 6}
                        className="w-full h-14 bg-white text-black rounded-md hover:bg-neutral-100 font-normal transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] text-base"
                        radius="lg"
                        endContent={!isLoading && <ArrowRight className="h-4 w-4" />}
                    >
                        {isLoading ? "Verifying..." : "Verify OTP"}
                    </Button>
                </>
            )}
        </form>
    );
}
