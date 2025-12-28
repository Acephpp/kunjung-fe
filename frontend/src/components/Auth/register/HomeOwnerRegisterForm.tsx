"use client";

import { useState } from "react";

export default function HomeOwnerRegisterForm() {
    const [form, setForm] = useState({
        houseName: "",
        name: "",
        website: "",
        email: "",
        phone: "",
        message: "",
    });

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            !form.houseName ||
            !form.name ||
            !form.email ||
            !form.phone ||
            !form.message
        ) {
            setError("Please fill in all required fields.");
            return;
        }

        setError("");
        setSubmitted(true);

        console.log("FORM DATA:", form);
    };

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
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-3xl mx-auto space-y-6"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* House Name */}
                <div className="relative">
                    <input
                        type="text"
                        name="houseName"
                        placeholder=" "
                        value={form.houseName}
                        onChange={handleChange}
                        className={inputBase}
                        required
                    />
                    <label className={labelBase}>House name*</label>
                </div>

                {/* Owner Name */}
                <div className="relative">
                    <input
                        type="text"
                        name="name"
                        placeholder=" "
                        value={form.name}
                        onChange={handleChange}
                        className={inputBase}
                        required
                    />
                    <label className={labelBase}>Your name*</label>
                </div>

                {/* Website */}
                <div className="relative md:col-span-2">
                    <input
                        type="text"
                        name="website"
                        placeholder=" "
                        value={form.website}
                        onChange={handleChange}
                        className={inputBase}
                    />
                    <label className={labelBase}>Website link</label>
                </div>

                {/* Email */}
                <div className="relative">
                    <input
                        type="email"
                        name="email"
                        placeholder=" "
                        value={form.email}
                        onChange={handleChange}
                        className={inputBase}
                        required
                    />
                    <label className={labelBase}>Email address*</label>
                </div>

                {/* Phone */}
                <div className="relative">
                    <input
                        type="text"
                        name="phone"
                        placeholder=" "
                        value={form.phone}
                        onChange={handleChange}
                        className={inputBase}
                        required
                    />
                    <label className={labelBase}>Phone number*</label>
                </div>

                {/* Message */}
                <div className="relative md:col-span-2">
                    <textarea
                        name="message"
                        placeholder=" "
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        required
                        className="
                            peer
                            w-full
                            rounded-2xl
                            border border-gray-400
                            bg-[#FAF8F3]
                            px-5
                            pt-4
                            text-[16px]
                            outline-none
                            transition-all
                            duration-200
                            ease-out
                            focus:border-black
                            focus:shadow-sm
                        "
                    />
                    <label className={labelBase}>Message*</label>
                </div>
            </div>

            {error && (
                <p className="text-red-600 text-sm">{error}</p>
            )}

            {submitted && (
                <p className="text-green-600 text-sm">
                    Form submitted successfully!
                </p>
            )}

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
                    Submit listing
                </button>
            </div>
            {/* Divider */}
            <div className="w-full mt-10 border-t border-gray-200" />

            {/* Have an account */}
            <div className="w-full text-center">
                <p className="text-[14px] md:text-[16px] text-gray-600">
                    Have an account?{" "}
                    <a
                        href="/auth/login/homeOwner"
                        className="
                font-medium
                underline
                text-gray-800
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
