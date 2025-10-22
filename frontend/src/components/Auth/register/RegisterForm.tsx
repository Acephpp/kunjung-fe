"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <form className="w-full max-w-3xl space-y-6">
            {/* Grid 2 kolom */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                    <input
                        type="text"
                        placeholder="First name*"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 bg-transparent focus:ring-1 focus:ring-gray-400 focus:outline-none"
                        required
                    />
                </div>

                {/* Last Name */}
                <div>
                    <input
                        type="text"
                        placeholder="Last name"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 bg-transparent focus:ring-1 focus:ring-gray-400 focus:outline-none"
                    />
                </div>

                {/* Email */}
                <div>
                    <input
                        type="email"
                        placeholder="Email*"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 bg-transparent focus:ring-1 focus:ring-gray-400 focus:outline-none"
                        required
                    />
                </div>

                {/* Confirm Email */}
                <div>
                    <input
                        type="email"
                        placeholder="Confirm email*"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 bg-transparent focus:ring-1 focus:ring-gray-400 focus:outline-none"
                        required
                    />
                </div>

                {/* Password */}
                <div className="relative flex items-center">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password*"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 bg-transparent focus:ring-1 focus:ring-gray-400 focus:outline-none"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 text-gray-500 hover:text-gray-700"
                        aria-label="Toggle password visibility"
                    >
                        {showPassword ? (
                            <EyeOff size={18} strokeWidth={1.5} />
                        ) : (
                            <Eye size={18} strokeWidth={1.5} />
                        )}
                    </button>
                </div>

                {/* Confirm Password */}
                <div className="relative flex items-center">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm password*"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 bg-transparent focus:ring-1 focus:ring-gray-400 focus:outline-none"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 text-gray-500 hover:text-gray-700"
                        aria-label="Toggle confirm password visibility"
                    >
                        {showConfirmPassword ? (
                            <EyeOff size={18} strokeWidth={1.5} />
                        ) : (
                            <Eye size={18} strokeWidth={1.5} />
                        )}
                    </button>
                </div>
            </div>

            {/* Newsletter */}
            <div className="flex items-center pt-2">
                <input
                    type="checkbox"
                    id="newsletter"
                    className="w-4 h-4 border-gray-300 text-brown-600 focus:ring-gray-400"
                />
                <label
                    htmlFor="newsletter"
                    className="ml-2 text-[16px] text-gray-700 select-none"
                >
                    Subscribe to newsletter
                </label>
            </div>

            {/* Button */}
            <div className="flex justify-start">
                <button
                    type="submit"
                    className="w-[200px] bg-[#7A3E2C] hover:bg-[#6c3827] text-white py-2.5 rounded-md transition-all"
                >
                    Register
                </button>
            </div>
        </form>
    );
}
