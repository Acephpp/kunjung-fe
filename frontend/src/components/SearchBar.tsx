"use client";

import { useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchBar() {
    const [region, setRegion] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState("");

    return (
        <div className="max-w-5xl mx-auto px-4 mt-25">
            <div className="flex items-center bg-[#F7F5F1] rounded-2xl shadow-md border border-gray-200 overflow-hidden">
                {/* Where */}
                <div className="flex-1 px-6 py-4 border-r border-gray-300">
                    <label className="block text-xs font-medium text-gray-500">Where</label>
                    <input
                        type="text"
                        placeholder="Select region"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className="w-full bg-transparent outline-none text-gray-700 text-sm"
                    />
                </div>

                {/* Check in */}
                <div className="flex-1 px-6 py-4 border-r border-gray-300">
                    <label className="block text-xs font-medium text-gray-500">Check in</label>
                    <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full bg-transparent outline-none text-gray-700 text-sm"
                    />
                </div>

                {/* Check out */}
                <div className="flex-1 px-6 py-4 border-r border-gray-300">
                    <label className="block text-xs font-medium text-gray-500">Check out</label>
                    <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full bg-transparent outline-none text-gray-700 text-sm"
                    />
                </div>

                {/* Who */}
                <div className="flex-1 px-6 py-4">
                    <label className="block text-xs font-medium text-gray-500">Who</label>
                    <input
                        type="number"
                        placeholder="Add guests"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full bg-transparent outline-none text-gray-700 text-sm"
                    />
                </div>

                {/* Button Search */}
                <button className="bg-[#7A3E2C] text-white p-4 rounded-full m-2 flex items-center justify-center hover:bg-[#5c2e20] transition">
                    <FiSearch size={18} />
                </button>
            </div>
        </div>
    );
}
