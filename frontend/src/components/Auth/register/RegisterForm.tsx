"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const inputBase = `
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
    `;

    const labelBase = `
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
    `;

    return (
        <form className="w-full max-w-3xl space-y-8">
            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* First Name */}
                <div className="relative">
                    <input
                        type="text"
                        id="first-name"
                        placeholder=" "
                        required
                        className={inputBase}
                    />
                    <label htmlFor="first-name" className={labelBase}>
                        First name*
                    </label>
                </div>

                {/* Last Name */}
                <div className="relative">
                    <input
                        type="text"
                        id="last-name"
                        placeholder=" "
                        className={inputBase}
                    />
                    <label htmlFor="last-name" className={labelBase}>
                        Last name
                    </label>
                </div>

                {/* Email */}
                <div className="relative">
                    <input
                        type="email"
                        id="email"
                        placeholder=" "
                        required
                        className={inputBase}
                    />
                    <label htmlFor="email" className={labelBase}>
                        Email*
                    </label>
                </div>

                {/* Confirm Email */}
                <div className="relative">
                    <input
                        type="email"
                        id="confirm-email"
                        placeholder=" "
                        required
                        className={inputBase}
                    />
                    <label htmlFor="confirm-email" className={labelBase}>
                        Confirm email*
                    </label>
                </div>

                {/* Password */}
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder=" "
                        required
                        className={`${inputBase} pr-12`}
                    />
                    <label htmlFor="password" className={labelBase}>
                        Password*
                    </label>

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 transition"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>

                {/* Confirm Password */}
                <div className="relative">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirm-password"
                        placeholder=" "
                        required
                        className={`${inputBase} pr-12`}
                    />
                    <label htmlFor="confirm-password" className={labelBase}>
                        Confirm password*
                    </label>

                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 transition"
                    >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
            </div>

            {/* Newsletter */}
            <div className="flex items-start gap-2 pt-2">
                <input
                    type="checkbox"
                    id="newsletter"
                    className="mt-1 w-4 h-4 border-gray-300 focus:ring-gray-400"
                />
                <label
                    htmlFor="newsletter"
                    className="text-[14px] md:text-[16px] text-gray-700"
                >
                    Subscribe to newsletter
                </label>
            </div>

            {/* Button */}
            <div className="flex justify-start">
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
                    Register
                </button>
            </div>
            {/* Divider + Login link */}
            <div className="flex flex-col items-center">
                <div className="w-full border-t border-gray-200 mb-6"></div>

                <p className="text-[14px] md:text-[16px] text-gray-500 text-center">
                    Have an account?{" "}
                    <a
                        href="/auth/login/guest"
                        className="
                text-gray-900
                font-medium
                underline-offset-4
                hover:underline
                hover:text-black
                transition
            "
                    >
                        Log in here
                    </a>
                </p>
            </div>

        </form>
    );
}
