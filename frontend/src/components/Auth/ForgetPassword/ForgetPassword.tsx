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

        // Simulasi pengiriman email reset password
        setTimeout(() => {
            alert(`Password reset email sent to ${email}`);
        }, 500);
    };

    // Tentukan link login berdasarkan role
    const loginLink = role === "guest" ? "/login/guest" : "/login/home-owner";

    return (
        <div className="w-full max-w-md text-center">
            {/* 🔹 Title */}
            <h1 className="text-[48px] font-serif text-gray-900 mb-3 text-center font-primary leading-tight">
                <span className="block">Forgot</span>
                <span className="block -mt-2">your password?</span>
            </h1>

            {/* 🔹 Deskripsi */}
            <p className="text-gray-600 text-[15px] leading-relaxed mb-10 font-secondary">
                Please enter your email address. You will receive a link to
                create a new password via email.
            </p>

            {/* 🔹 Form */}
            {!sent ? (
                <form onSubmit={handleSubmit} className="space-y-6 text-left">
                    <div>
                        <input
                            type="email"
                            placeholder="Email*"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 bg-transparent focus:ring-1 focus:ring-gray-400 focus:outline-none"
                        />
                        {error && (
                            <p className="text-red-600 text-sm mt-1">{error}</p>
                        )}
                    </div>

                    {/* Tombol dikiri */}
                    <div className="flex justify-start">
                        <button
                            type="submit"
                            className="bg-[#7A3E2C] hover:bg-[#6c3827] text-white px-6 py-2.5 rounded-md transition-all text-[15px] font-medium font-secondary"
                        >
                            send reset email
                        </button>
                    </div>
                </form>
            ) : (
                <div className="text-center">
                    <p className="text-green-700 font-medium">
                        ✅ A reset link has been sent to your email!
                    </p>
                </div>
            )}

            {/* 🔹 Divider */}
            <div className="w-full border-t border-gray-300 my-10"></div>

            {/* 🔹 Link to Login */}
            <p className="text-[15px] text-gray-700 font-secondary">
                Remember your password?{" "}
                <Link
                    href={loginLink}
                    className="underline hover:text-gray-900"
                >
                    Log in
                </Link>
            </p>
        </div>
    );
}
