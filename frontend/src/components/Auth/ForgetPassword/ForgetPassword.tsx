"use client";

import { useState } from "react";
import Link from "next/link";

interface ForgotPasswordFormProps {
    role: "guest" | "homeOwner";
}

export default function ForgotPassword({ role }: ForgotPasswordFormProps) {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email.trim()) {
            setError("Please enter your email address.");
            return;
        }

        setError("");
        setSent(true);

        setTimeout(() => {
            alert(`Password reset email sent to ${email}`);
        }, 500);
    };

    const loginLink =
        role === "guest"
            ? "/auth/login/guest"
            : "/auth/login/home-owner";

    return (
        <div className="w-full max-w-md text-center">
            {/* TITLE */}
            <h1
                className="
                    font-serif
                    text-gray-900
                    leading-tight
                    mb-3
                    text-[36px]
                    sm:text-[48px]
                "
            >
                Forgot your password?
            </h1>

            {/* DESCRIPTION */}
            <p className="text-gray-600 text-[14px] sm:text-[16px] mb-10">
                Please enter your email address. You will receive a link to
                create a new password.
            </p>

            {/* FORM */}
            {!sent ? (
                <form
                    onSubmit={handleSubmit}
                    className="space-y-7 text-left"
                >
                    {/* Email */}
                    <div className="relative">
                        <input
                            type="email"
                            id="forgot-email"
                            placeholder=" "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="
                                peer
                                w-full
                                h-[56px]
                                rounded-2xl
                                border border-gray-400
                                bg-[#FAF8F3]
                                px-5
                                text-[16px]
                                outline-none
                                transition-all
                                duration-200
                                focus:border-black
                                focus:shadow-sm
                            "
                        />

                        <label
                            htmlFor="forgot-email"
                            className="
                                absolute
                                left-4
                                top-1/2
                                -translate-y-1/2
                                text-gray-400
                                text-[16px]
                                px-2
                                bg-[#FAF8F3]
                                pointer-events-none
                                transition-all
                                duration-200

                                peer-focus:top-0
                                peer-focus:text-[12px]
                                peer-focus:text-black

                                peer-not-placeholder-shown:top-0
                                peer-not-placeholder-shown:text-[12px]
                                peer-not-placeholder-shown:text-black
                            "
                        >
                            Email*
                        </label>

                        {error && (
                            <p className="text-red-600 text-sm mt-2">
                                {error}
                            </p>
                        )}
                    </div>

                    {/* Button */}
                    <div className="flex flex-col items-center md:items-start">
                        <button
                            type="submit"
                            className="
                                w-full md:w-[200px]
                                bg-[#7A3E2C]
                                hover:bg-[#6c3827]
                                active:scale-[0.98]
                                text-white
                                py-3 md:py-2.5
                                rounded-md
                                transition-all
                                duration-200
                            "
                        >
                            Send reset email
                        </button>
                    </div>
                </form>
            ) : (
                <p className="text-green-700 font-medium text-center">
                    ✅ A reset link has been sent to your email!
                </p>
            )}

            {/* DIVIDER */}
            <div className="w-full mt-10 border-t border-gray-300" />

            {/* BACK TO LOGIN */}
            <div className="pt-6 text-center">
                <p className="text-[14px] sm:text-[16px] text-gray-600">
                    Remember your password?{" "}
                    <Link
                        href={loginLink}
                        className="underline text-gray-800 hover:text-black transition"
                    >
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}
