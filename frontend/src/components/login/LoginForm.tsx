"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Dummy user data
        const firstName = "Acep";
        const lastName = "Handika";
        const validEmail = "admin@gmail.com";
        const validPassword = "admin123";

        if (email === validEmail && password === validPassword) {
            setError("");

            // ✅ Save user data to localStorage
            localStorage.setItem("user", JSON.stringify({ firstName, lastName, email: validEmail }));

            // ✅ Redirect to homepage
            router.push("/");

            // Optional: force reload so Navbar updates immediately
            setTimeout(() => {
                window.location.reload();
            }, 300);
        } else {
            setError("Incorrect email or password!");
        }
    };

    return (
        <form onSubmit={handleLogin} className="w-full max-w-md space-y-5">
            {/* Email */}
            <div>
                <input
                    type="email"
                    placeholder="Email*"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 bg-transparent focus:ring-1 focus:ring-gray-400 focus:outline-none"
                    required
                />
            </div>

            {/* Password */}
            <div className="relative flex items-center">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password*"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
            <div className="flex flex-col">
                <button
                    type="submit"
                    className="w-[200px] bg-[#7A3E2C] hover:bg-[#6c3827] text-white py-2.5 rounded-md transition-all"
                >
                    Log in
                </button>

                {/* Error Message */}
                {error && (
                    <p className="text-red-600 text-sm mt-2">{error}</p>
                )}

                {/* Divider */}
                <div className="w-full mt-10 mb-5 border-t border-gray-300"></div>
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
