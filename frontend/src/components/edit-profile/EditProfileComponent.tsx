"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";

export default function EditProfileComponent() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [showSuccess, setShowSuccess] = useState(false); // ✅ state pesan sukses

    // ✅ Ambil data dari localStorage saat pertama kali render
    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedUser = localStorage.getItem("user");
            if (savedUser) {
                try {
                    const parsed = JSON.parse(savedUser);
                    setFirstName(parsed.firstName || "");
                    setLastName(parsed.lastName || "");
                    setEmail(parsed.email || "");
                    setPhone(parsed.phone || "");

                    // ✅ Jika flag success tersimpan di localStorage, tampilkan pesan
                    if (parsed.successFlag) {
                        setShowSuccess(true);

                        // hapus flag agar tidak muncul terus setiap reload berikutnya
                        const cleanedUser = { ...parsed };
                        delete cleanedUser.successFlag;
                        localStorage.setItem("user", JSON.stringify(cleanedUser));
                    }
                } catch (error) {
                    console.error("Failed to parse user data:", error);
                }
            }
        }
    }, []);

    // ✅ Simpan ke localStorage dan reload untuk menampilkan pesan sukses
    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const updatedUser = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            phone: phone.trim(),
            successFlag: true, // ✅ tambahkan flag agar pesan muncul setelah reload
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));

        // ✅ reload halaman agar pesan sukses muncul setelah render ulang
        window.location.reload();
    };

    return (
        <div className="flex flex-col items-center w-full">
            {/* ✅ Pesan sukses muncul setelah reload */}
            {showSuccess && (
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Success</h2>
                    <p className="text-gray-700 mt-1">
                        Account updated successfully
                    </p>
                    <div className="flex justify-center mt-3">
                        <Check size={28} className="text-[#7A3E2C]" />
                    </div>
                </div>
            )}

            {/* ✅ Form (tidak diubah) */}
            <form
                onSubmit={handleUpdate}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl"
            >
                {/* First Name */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-800 mb-1">
                        First name<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="John"
                        className="border border-gray-400 rounded-md px-4 py-2 bg-transparent focus:outline-none focus:ring-1 focus:ring-gray-400"
                        required
                    />
                </div>

                {/* Last Name */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-800 mb-1">
                        Last name
                    </label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Doe"
                        className="border border-gray-400 rounded-md px-4 py-2 bg-transparent focus:outline-none focus:ring-1 focus:ring-gray-400"
                    />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-800 mb-1">
                        Email<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john.doe@gmail.com"
                        className="border border-gray-400 rounded-md px-4 py-2 bg-transparent focus:outline-none focus:ring-1 focus:ring-gray-400"
                        required
                    />
                </div>

                {/* Phone Number */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-800 mb-1">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone Number"
                        className="border border-gray-400 rounded-md px-4 py-2 bg-transparent focus:outline-none focus:ring-1 focus:ring-gray-400"
                    />
                </div>

                {/* Update Button */}
                <div className="col-span-1 md:col-span-2 mt-6">
                    <button
                        type="submit"
                        className="px-15 py-2 bg-[#7A3E2C] hover:bg-[#6c3827] text-white rounded-md transition-all"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}
