"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function HomeOwnerLoginForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const user = {
            firstName: "Bunga",
            lastName: "Permata",
            email: "owner@gmail.com",
            password: "owner123",
            role: "homeOwner",
        };

        if (email === user.email && password === user.password) {
            setError("");
            localStorage.setItem("user", JSON.stringify(user));

            await router.push("/dashboard/home-owner");

            setTimeout(() => {
                window.location.href =
                    window.location.origin + "/dashboard/home-owner";
            }, 400);
        } else {
            setError("Incorrect email or password");
        }
    };

    return (
        <form
            onSubmit={handleLogin}
            className="w-full max-w-full md:max-w-md space-y-7"
        >
            {/* Email */}
            <div className="relative">
                <input
                    type="email"
                    id="login-email"
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
                        ease-out
                        focus:border-black
                        focus:shadow-sm
                    "
                />

                <label
                    htmlFor="login-email"
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
                        ease-out

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
            </div>

            {/* Password */}
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    id="login-password"
                    placeholder=" "
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="
                        peer
                        w-full
                        h-[56px]
                        rounded-2xl
                        border border-gray-400
                        bg-[#FAF8F3]
                        px-5
                        pr-12
                        text-[16px]
                        outline-none
                        transition-all
                        duration-200
                        ease-out
                        focus:border-black
                        focus:shadow-sm
                    "
                />

                <label
                    htmlFor="login-password"
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
                        ease-out

                        peer-focus:top-0
                        peer-focus:text-[12px]
                        peer-focus:text-black

                        peer-not-placeholder-shown:top-0
                        peer-not-placeholder-shown:text-[12px]
                        peer-not-placeholder-shown:text-black
                    "
                >
                    Password*
                </label>

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        text-gray-500
                        hover:text-gray-800
                        transition
                    "
                >
                    {showPassword ? (
                        <EyeOff size={18} strokeWidth={1.5} />
                    ) : (
                        <Eye size={18} strokeWidth={1.5} />
                    )}
                </button>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
                <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 border-gray-300 focus:ring-gray-400"
                />
                <label
                    htmlFor="remember"
                    className="ml-2 text-sm md:text-[16px] text-gray-700 select-none"
                >
                    Remember me
                </label>
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
                        ease-out
                    "
                >
                    Log in
                </button>

                {error && (
                    <p className="text-red-600 text-sm mt-3">{error}</p>
                )}

                <div className="w-full mt-8 border-t border-gray-300" />
            </div>

            <div className="text-center">
                <Link
                    href="/auth/forgot-password/home-owner"
                    className="text-sm md:text-[16px] underline text-gray-700 hover:text-gray-900 transition"
                >
                    Forgot your password?
                </Link>
            </div>
        </form>
    );
}
