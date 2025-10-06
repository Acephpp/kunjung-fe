"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <form className="w-full max-w-md space-y-5">
            {/* Email */}
            <div>
                <label className="block text-sm text-gray-700 mb-1">Email*</label>
                <input
                    type="email"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-1 focus:ring-gray-400 focus:outline-none bg-transparent"
                    required
                />
            </div>

            {/* Password */}
            <div>
                <label className="block text-sm text-gray-700 mb-1">Password*</label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-1 focus:ring-gray-400 focus:outline-none bg-transparent"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
                <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 border-gray-300 text-brown-600 focus:ring-gray-400"
                />
                <label
                    htmlFor="remember"
                    className="ml-2 text-[16px] text-gray-700 select-none"
                >
                    Remember me
                </label>
            </div>

            {/* Button */}
            <div className="flex flex-col items-center">
                <button
                    type="submit"
                    className="w-[200px] bg-[#7A3E2C] hover:bg-[#6c3827] text-white py-2.5 rounded-md transition-all"
                >
                    Log in
                </button>

                {/* ✅ Garis pemisah setelah tombol */}
                <div className="w-full mt-6 border-t border-gray-300"></div>
            </div>

            {/* Forgot Password */}
            <div className="text-center">
                <Link
                    href="/forgot-password"
                    className="text-[16px] underline text-gray-700 hover:text-gray-900"
                >
                    Forgot your password?
                </Link>
            </div>
        </form>
    );
}
