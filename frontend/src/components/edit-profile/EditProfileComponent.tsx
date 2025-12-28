"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";

export default function EditProfileComponent() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedUser = localStorage.getItem("user");
            if (savedUser) {
                const parsed = JSON.parse(savedUser);
                setFirstName(parsed.firstName || "");
                setLastName(parsed.lastName || "");
                setEmail(parsed.email || "");
                setPhone(parsed.phone || "");

                if (parsed.successFlag) {
                    setShowSuccess(true);
                    const cleaned = { ...parsed };
                    delete cleaned.successFlag;
                    localStorage.setItem("user", JSON.stringify(cleaned));
                }
            }
        }
    }, []);

    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const updatedUser = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            phone: phone.trim(),
            successFlag: true,
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));
        window.location.reload();
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

        peer-focus:top-0
        peer-focus:text-[12px]
        peer-focus:text-black

        peer-not-placeholder-shown:top-0
        peer-not-placeholder-shown:text-[12px]
        peer-not-placeholder-shown:text-black
    `;

    return (
        <div className="w-full max-w-4xl">
            {/* SUCCESS MESSAGE */}
            {showSuccess && (
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-3">
                        <Check size={32} className="text-[#7A3E2C]" />
                    </div>
                    <h2 className="text-[20px] font-medium text-gray-800">
                        Account updated successfully
                    </h2>
                </div>
            )}

            <form
                onSubmit={handleUpdate}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {/* First Name */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder=" "
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className={inputBase}
                    />
                    <label className={labelBase}>First name*</label>
                </div>

                {/* Last Name */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder=" "
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className={inputBase}
                    />
                    <label className={labelBase}>Last name</label>
                </div>

                {/* Email */}
                <div className="relative">
                    <input
                        type="email"
                        placeholder=" "
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={inputBase}
                    />
                    <label className={labelBase}>Email*</label>
                </div>

                {/* Phone */}
                <div className="relative">
                    <input
                        type="tel"
                        placeholder=" "
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={inputBase}
                    />
                    <label className={labelBase}>Phone number</label>
                </div>

                {/* Button */}
                <div className="col-span-1 md:col-span-2 mt-6">
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
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}
