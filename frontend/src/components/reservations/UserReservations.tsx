"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";
import { villas } from "@/app/data/villas";
import { FaWhatsapp } from "react-icons/fa";

export default function UserReservations() {
    const [activeTab, setActiveTab] = useState<"upcoming" | "completed">("upcoming");

    return (
        <div className="max-w-9xl mx-auto px-4 md:px-10 py-8 md:py-12 font-secondary text-gray-800">
            <div className="bg-[#FCFBF7] rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-gray-200 overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b">
                    {["upcoming", "completed"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`flex-1 py-3 md:py-4 text-sm md:text-lg font-semibold ${
                                activeTab === tab
                                    ? "text-[#7A3E2C] border-b-[3px] border-[#7A3E2C]"
                                    : "text-gray-400"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {activeTab === "upcoming" ? (
                    <div className="p-4 md:p-10 space-y-6">
                        {villas.slice(0, 2).map((villa, index) => {
                            const isConfirmed = index === 0;

                            return (
                                <div
                                    key={villa.id}
                                    className="border border-gray-200 rounded-2xl shadow-sm overflow-hidden bg-[#FCFBF7]"
                                >
                                    {/* ================= MOBILE ================= */}
                                    <div className="md:hidden p-4 space-y-4">
                                        {/* ROW */}
                                        <div className="flex gap-4 items-stretch">
                                            {/* IMAGE */}
                                            <div className="relative w-[110px] h-[110px] rounded-xl overflow-hidden shrink-0">
                                                <Image
                                                    src={villa.image}
                                                    alt={villa.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                                {isConfirmed && (
                                                    <span className="absolute bottom-2 left-2 px-2 py-[2px] text-[10px] font-semibold rounded-md bg-blue-100 text-blue-700">
                                                        confirmed
                                                    </span>
                                                )}
                                            </div>

                                            {/* TEXT (TINGGI DISAMAKAN) */}
                                            <div className="flex-1 flex flex-col h-[110px]">
                                                <div>
                                                    <h2 className="text-[20px] font-primary leading-tight">
                                                        {villa.name}
                                                    </h2>
                                                    <p className="flex items-center text-gray-500 text-sm mt-1">
                                                        <MapPin size={12} className="mr-1" />
                                                        {villa.location}
                                                    </p>
                                                </div>

                                                {/* BADGE — FIX NEMPEL BAWAH */}
                                                <div className="flex gap-2 mt-auto">
                                                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold">
                                                        2 Nights
                                                    </span>
                                                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold">
                                                        {villa.guests} Guests
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* CHECK IN / OUT */}
                                        <div className="flex justify-between items-center text-sm border-t border-gray-300 pt-4">
                                            <div>
                                                <p className="font-semibold">
                                                    Check in <span className="text-gray-400">14.00</span>
                                                </p>
                                                <p className="text-gray-400">Mon, 08 Sep 2025</p>
                                            </div>
                                            <ArrowRight size={18} className="text-gray-400" />
                                            <div className="text-right">
                                                <p className="font-semibold">
                                                    Check out <span className="text-gray-400">12.00</span>
                                                </p>
                                                <p className="text-gray-400">Wed, 10 Sep 2025</p>
                                            </div>
                                        </div>

                                        {/* PRICE */}
                                        <div className="space-y-2 border-t border-gray-300 pt-4 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500 font-bold">Accommodation fare</span>
                                                <span className="font-semibold">{villa.totalPrice}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500 font-bold">Taxes</span>
                                                <span className="text-gray-500">10% (included)</span>
                                            </div>
                                            <hr />
                                            <div className="flex justify-between font-bold">
                                                <span>TOTAL</span>
                                                <span>{villa.totalPrice}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ================= DESKTOP (ASLI — TIDAK DIUBAH) ================= */}
                                    <div className="hidden md:flex md:flex-row">
                                        <div className="relative md:w-[35%] p-5">
                                            <div className="rounded-xl overflow-hidden">
                                                <Image
                                                    src={villa.image}
                                                    alt={villa.name}
                                                    width={500}
                                                    height={300}
                                                    className="object-cover w-full h-[300px]"
                                                />
                                            </div>
                                            <span className="absolute bottom-8 left-8 px-3 py-[2px] text-xs font-medium rounded-md bg-blue-100 text-blue-700">
                                                confirmed
                                            </span>
                                        </div>

                                        <div className="flex-1 flex justify-between p-6 pr-8">
                                            <div className="md:w-[55%] flex flex-col">
                                                <h2 className="text-[40px] font-primary">{villa.name}</h2>
                                                <p className="flex items-center text-gray-500 text-[16px] mb-3">
                                                    <MapPin size={14} className="mr-1" />
                                                    {villa.location}
                                                </p>

                                                <div className="flex gap-2 mt-auto mb-5 font-semibold">
                                                    <span className="px-3 py-[3px] bg-gray-100 rounded-md">
                                                        2 Nights
                                                    </span>
                                                    <span className="px-3 py-[3px] bg-gray-100 rounded-md">
                                                        {villa.guests} Guests
                                                    </span>
                                                </div>

                                                <div className="flex gap-3 text-sm">
                                                    <div>
                                                        <p className="font-semibold">Check in 14.00</p>
                                                        <p>Mon, 08 Sep 2025</p>
                                                    </div>
                                                    <ArrowRight />
                                                    <div>
                                                        <p className="font-semibold">Check out 12.00</p>
                                                        <p>Wed, 10 Sep 2025</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="w-px bg-gray-200 mx-8" />

                                            <div className="w-[45%] flex flex-col justify-between text-right">
                                                <div>
                                                    <p className="flex justify-between">
                                                        <span>Accommodation fare</span>
                                                        <span>{villa.totalPrice}</span>
                                                    </p>
                                                    <p className="flex justify-between">
                                                        <span>Taxes</span>
                                                        <span>10% (included)</span>
                                                    </p>
                                                    <hr className="my-3" />
                                                    <p className="flex justify-between font-bold">
                                                        <span>TOTAL</span>
                                                        <span>{villa.totalPrice}</span>
                                                    </p>
                                                </div>

                                                <button
                                                    disabled={!isConfirmed}
                                                    className="mt-6 flex justify-between items-center px-4 py-2 rounded-xl border bg-gray-100"
                                                >
                                                    <span>Cancel or Reschedule</span>
                                                    <FaWhatsapp size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="py-20 md:py-24 px-6 md:px-10 text-center">
                        <h2 className="font-primary text-[28px] md:text-[52px]">
                            Feel the needs
                            <br />
                            to discover new things?
                        </h2>
                        <p className="mt-4 text-gray-500">
                            Explore house and services.
                            <br />
                            When you book, your reservations will show up here.
                        </p>
                        <button className="mt-8 px-18  py-4 rounded-xl bg-[#7A3E2C] text-white">
                            start exploring
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
