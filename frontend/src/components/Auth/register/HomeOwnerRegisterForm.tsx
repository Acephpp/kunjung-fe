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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validasi sederhana
        if (!form.houseName || !form.name || !form.email || !form.phone || !form.message) {
            setError("Please fill in all required fields.");
            return;
        }

        setError("");
        setSubmitted(true);

        setTimeout(() => {
            alert(`Your listing for "${form.houseName}" has been submitted!`);
        }, 400);
    };

    return (
        <div className="w-full max-w-2xl text-center mx-auto">
            {/* Title */}
            <h2 className="text-[32px] font-secondary text-gray-800">List your house</h2>
            <h1 className="text-[64px] font-serif text-gray-900 mb-10 -mt-5">
                Register now
            </h1>

            {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5 text-left font-secondary">
                    {/* Row 1: House Name + Your Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="houseName"
                            placeholder="House name*"
                            value={form.houseName}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-4 py-2 bg-transparent focus:ring-1 focus:ring-gray-400 focus:outline-none"
                        />
                        <input
                            type="text"
                            name="name"
                            placeholder="Your name*"
                            value={form.name}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-4 py-2 bg-transparent focus:ring-1 focus:ring-gray-400 focus:outline-none"
                        />
                    </div>

                    {/* Row 2: Website Link */}
                    <input
                        type="text"
                        name="website"
                        placeholder="Website link"
                        value={form.website}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 bg-transparent focus:ring-1 focus:ring-gray-400 focus:outline-none"
                    />

                    {/* Row 3: Email + Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email address*"
                            value={form.email}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-4 py-2 bg-transparent focus:ring-1 focus:ring-gray-400 focus:outline-none"
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone number*"
                            value={form.phone}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-4 py-2 bg-transparent focus:ring-1 focus:ring-gray-400 focus:outline-none"
                        />
                    </div>

                    {/* Row 4: Message */}
                    <textarea
                        name="message"
                        placeholder="Messages*"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 bg-transparent focus:ring-1 focus:ring-gray-400 focus:outline-none"
                    ></textarea>

                    {error && <p className="text-red-600 text-sm">{error}</p>}

                    {/* Button kiri */}
                    <div className="flex justify-start">
                        <button
                            type="submit"
                            className="bg-[#7A3E2C] hover:bg-[#6c3827] text-white px-15 py-2.5 rounded-md transition-all text-[15px] font-medium"
                        >
                            submit listing
                        </button>
                    </div>
                </form>
            ) : (
                <div className="text-green-700 font-medium mt-10">
                    ✅ Your house has been successfully submitted!
                </div>
            )}
        </div>
    );
}
