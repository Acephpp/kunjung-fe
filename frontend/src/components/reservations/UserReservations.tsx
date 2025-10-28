"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, ArrowRight, Plus } from "lucide-react";
import { villas } from "@/app/data/villas";

export default function UserReservations() {
    const [activeTab, setActiveTab] = useState<"upcoming" | "completed">("upcoming");

    return (
        <div className="max-w-9xl mx-auto px-10 py-12 font-secondary text-gray-800">
            {/* === Outer Card Container === */}
            <div className="bg-[#FCFBF7] rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-gray-200 overflow-hidden">
                {/* === Tabs === */}
                <div className="flex w-full border-b border-gray-200 relative rounded-t-3xl overflow-hidden">
                    <button
                        onClick={() => setActiveTab("upcoming")}
                        className={`flex-1 py-4 text-lg font-semibold text-center transition-all duration-300 ${activeTab === "upcoming"
                            ? "text-[#7A3E2C] border-b-[3px] border-[#7A3E2C]"
                            : "text-gray-400"
                            }`}
                    >
                        upcoming
                    </button>
                    <button
                        onClick={() => setActiveTab("completed")}
                        className={`flex-1 py-4 text-lg font-semibold text-center transition-all duration-300 ${activeTab === "completed"
                            ? "text-[#7A3E2C] border-b-[3px] border-[#7A3E2C]"
                            : "text-gray-400"
                            }`}
                    >
                        completed
                    </button>
                </div>


                {/* === Reservation Cards === */}
                <div className="p-10 space-y-8">
                    {villas.slice(0, 2).map((villa, index) => (
                        <div
                            key={villa.id}
                            className="flex flex-col md:flex-row border border-gray-200 rounded-2xl shadow-sm overflow-hidden"
                        >
                            {/* Gambar */}
                            <div className="relative md:w-[35%] p-5">
                                <div className="rounded-xl overflow-hidden">
                                    <Image
                                        src={villa.image}
                                        alt={villa.name}
                                        width={500}
                                        height={300}
                                        className="object-cover w-full h-60 md:h-full "
                                    />
                                </div>
                                <span
                                    className={`absolute bottom-8 left-8 px-3 py-[2px] text-xs font-medium rounded-md capitalize ${index === 0
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-yellow-100 text-yellow-700"
                                        }`}
                                >
                                    {index === 0 ? "confirmed" : "waiting for confirmation"}
                                </span>
                            </div>

                            {/* Informasi */}
                            <div className="flex-1 flex flex-col md:flex-row justify-between p-6 md:pr-8">
                                {/* Kiri - Detail Villa */}
                                <div className="text-gray-700 md:w-[55%] flex flex-col h-full">
                                    <div>
                                        <h2 className="text-[40px] font-primary">{villa.name}</h2>
                                        <p className="flex items-center text-gray-500 text-[16px] mb-3">
                                            <MapPin size={14} className="mr-1" />
                                            {villa.location}
                                        </p>

                                        
                                    </div>

                                    {/* Align bawah */}
                                    <div className="flex gap-2 mt-auto pt-4 mb-5 font-semibold">
                                        <span className="px-3 py-[3px] bg-gray-100 text-gray-700 text-sm rounded-md">
                                            2 Nights
                                        </span>
                                        <span className="px-3 py-[3px] bg-gray-100 text-gray-700 text-sm rounded-md">
                                            {villa.guests} Guests
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <div>
                                                <p className="font-semibold text-gray-800">Check in 14.00</p>
                                                <p>Mon, 08 Sep 2025</p>
                                            </div>
                                            <ArrowRight size={18} className="text-gray-400" />
                                            <div>
                                                <p className="font-semibold text-gray-800">Check out 12.00</p>
                                                <p>Wed, 10 Sep 2025</p>
                                            </div>
                                        </div>
                                </div>


                                {/* Garis Tengah Vertikal di Desktop */}
                                <div className="hidden md:block w-px bg-gray-200 mx-8"></div>

                                {/* Kanan - Harga & Total */}
                                <div className="flex flex-col justify-between text-right w-[45%]">
                                    <div>
                                        <p className="text-[16px] text-gray-500 flex justify-between md:gap-4">
                                            <span>Accommodation fare</span>
                                            <span className="font-medium text-gray-800">{villa.totalPrice}</span>
                                        </p>
                                        <p className="text-[16px] text-gray-500 flex justify-between md:gap-4">
                                            <span>Taxes</span>
                                            <span className="text-gray-600">10% (included)</span>
                                        </p>
                                        <hr className="my-3 border-gray-300" />
                                        <p className="font-bold text-gray-900 flex justify-between md:gap-4">
                                            <span>TOTAL</span>
                                            <span className="font-semibold">{villa.totalPrice}</span>
                                        </p>
                                    </div>

                                    <button className="flex items-center justify-end gap-1 text-[16px] text-gray-500 hover:text-[#7A3E2C] transition mt-3">
                                        see more details <Plus size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
