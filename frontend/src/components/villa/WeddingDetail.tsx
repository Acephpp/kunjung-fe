"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Bath,
    Bed,
    Check,
    Star,
    User,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import type { villas } from "@/app/data/villas";
import Link from "next/link";
import Image from "next/image";

type Villa = (typeof villas)[number];

interface DetailProps {
    villa: Villa;
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
}

// ⛔ DAFTAR TANGGAL TIDAK TERSEDIA (akan ditampilkan abu-abu)
const unavailableDates: string[] = [
    // contoh data, silakan ganti sesuai kebutuhan
    "2025-12-10",
    "2025-12-11",
];

const isDateUnavailable = (d: Date) => {
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
        2,
        "0"
    )}-${String(d.getDate()).padStart(2, "0")}`;
    return unavailableDates.includes(key);
};

export default function WeddingDetail({ villa, date, setDate }: DetailProps) {
    const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);

    // 📆 state dasar bulan & tahun (hindari bug loncat tahun)
    const [baseDate, setBaseDate] = useState(new Date());
    const baseMonth = baseDate.getMonth();
    const baseYear = baseDate.getFullYear();

    const goPrevMonth = () => {
        setBaseDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };

    const goNextMonth = () => {
        setBaseDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };

    const getDaysInMonth = (month: number, year: number) =>
        new Date(year, month + 1, 0).getDate();

    const renderMonth = (month: number, year: number) => {
        const days = getDaysInMonth(month, year);
        const firstDay = new Date(year, month, 1).getDay(); // 0 = Sun

        const weeks = [];
        let day = 1;
        let started = false;

        for (let row = 0; row < 6; row++) {
            const cells = [];

            for (let col = 0; col < 7; col++) {
                if (row === 0 && col === firstDay) started = true;

                if (!started || day > days) {
                    cells.push(
                        <div
                            key={col}
                            className="text-center py-2 text-sm text-transparent"
                        >
                            .
                        </div>
                    );
                } else {
                    const currentDate = new Date(year, month, day);
                    const unavailable = isDateUnavailable(currentDate);

                    cells.push(
                        <div
                            key={col}
                            className={`py-2 text-center text-sm font-medium ${
                                unavailable ? "text-gray-300" : "text-[#2D2A29]"
                            }`}
                        >
                            {day}
                        </div>
                    );

                    day++;
                }
            }

            weeks.push(
                <div key={row} className="grid grid-cols-7">
                    {cells}
                </div>
            );
        }

        return (
            <div>
                {/* Judul bulan per kolom (November 2025, December 2025, dll) */}
                <p className="font-semibold text-[15px] text-[#2D2A29] mb-3 text-center">
                    {new Date(year, month).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                    })}
                </p>

                <div className="grid grid-cols-7 text-[12px] text-gray-500 mb-2">
                    <span className="text-center">S</span>
                    <span className="text-center">M</span>
                    <span className="text-center">T</span>
                    <span className="text-center">W</span>
                    <span className="text-center">T</span>
                    <span className="text-center">F</span>
                    <span className="text-center">S</span>
                </div>

                {weeks}
            </div>
        );
    };

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
                {/* LEFT SIDE */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="font-primary text-[40px] font-semibold mb-4">
                        A tranquil stay in the city
                    </h2>

                    <div className="font-secondary flex justify-between items-center border rounded-md px-6 py-6 text-xl">
                        <div className="flex items-center gap-2">
                            <User className="w-5 h-5" />
                            {villa.guests} Guest
                        </div>

                        <span className="h-6 w-px bg-gray-500"></span>

                        <div className="flex items-center gap-2">
                            <Bed className="w-5 h-5" />
                            {villa.bedrooms} Bedrooms
                        </div>

                        <span className="h-6 w-px bg-gray-500"></span>

                        <div className="flex items-center gap-2">
                            <Bath className="w-5 h-5" />
                            {villa.bathrooms} Bathrooms
                        </div>
                    </div>

                    <div className="font-secondary flex justify-between items-center border rounded-md px-6 py-5 text-[18px]">
                        <span>Maximum event capacity</span>
                        <span className="font-bold">30 persons</span>
                    </div>

                    <p className="text-gray-600 max-w-5xl text-[25px] font-secondary mt-10">
                        Feel both the 90’s weather and the taste of a metropolitan
                        Bandung city during your staycation, without needing to move
                        from one house to another.
                    </p>

                    <div className="flex items-center border rounded-md px-5 py-3 w-fit gap-4 text-sm text-gray-700">
                        <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 fill-black text-black" />
                            <span className="font-semibold">{villa.rating}</span>
                        </div>

                        <span className="h-5 w-px bg-gray-500"></span>

                        <span className="text-black">{villa.reviews} reviews</span>
                    </div>

                    <hr className="my-6 border-gray-300 mt-10" />

                    <div className="mt-10">
                        {villa.description.split("\n\n").map((p, i) => (
                            <p
                                key={i}
                                className="text-gray-700 mb-4 text-[25px] font-secondary"
                            >
                                {p}
                            </p>
                        ))}
                    </div>

                    <div>
                        <h2 className="text-[40px] font-primary font-semibold mt-10">
                            Things To-Do
                        </h2>
                        <p className="text-gray-700 mt-3 text-[25px]">
                            {villa.thingsToDo}
                        </p>
                    </div>

                    <hr className="my-6 border-gray-300 mt-10" />

                    <div>
                        <h2 className="text-[40px] font-primary font-semibold mt-10">
                            Amenities
                        </h2>

                        <div className="grid grid-cols-3 text-gray-700">
                            {villa.amenities.map((a, i) => (
                                <div key={i} className="flex items-center gap-2 mt-5">
                                    <Check className="w-5 h-5" />
                                    <span className="font-secondary text-[23px]">
                                        {a}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <hr className="my-6 border-gray-300 mt-10" />

                    <div>
                        <h2 className="text-[40px] font-primary font-semibold mt-10">
                            Availability
                        </h2>
                        <div className="rounded-md border inline-block p-4 mt-5">
                            {/* kalender utama tetap bisa dipilih */}
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                numberOfMonths={2}
                                pagedNavigation
                            />
                        </div>
                    </div>

                    <hr className="my-6 border-gray-300 mt-10" />

                    <div>
                        <h2 className="text-[40px] font-primary font-semibold mt-10">
                            Location
                        </h2>
                        <p className="text-gray-700 mt-5 text-[25px] font-secondary">
                            {villa.address}
                        </p>

                        <iframe
                            src={villa.mapUrl}
                            width="100%"
                            height="500"
                            className="rounded-sm mt-5"
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>

                {/* RIGHT SIDE – EVENT INQUIRY CARD */}
                <div className="lg:col-span-1 mt-5">
                    <Card className="sticky top-2/12 py-10 px-10 rounded-xl shadow-xl bg-[#fcfbf7] border-[#E7E6E2] flex flex-col gap-6">
                        <div>
                            <p className="text-[30px] font-primary text-center">
                                We know that
                            </p>
                            <h3 className="text-[30px] text-center font-primary font-semibold text-[#2D2A29] leading-snug">
                                this is inconvenient
                            </h3>
                        </div>

                        <p className="text-[12px] text-center font-secondary text-[#7E7A76] leading-relaxed">
                            For this type of booking, prices and direct reservations
                            aren’t available online due to the many details involved.
                            Please contact us directly so we can assist you with the best
                            available options.
                        </p>

                        <p className="text-[15px] text-center font-secondary text-[#7E7A76] leading-relaxed">
                            Please make sure that you have checked the{" "}
                            <button
                                type="button"
                                onClick={() => setShowAvailabilityModal(true)}
                                className="underline underline-offset-2 text-black font-semibold"
                            >
                                availability calendar
                            </button>
                            .
                        </p>

                        <Link
                            href="https://wa.me/6281234567890"
                            target="_blank"
                            className="block"
                        >
                            <Button
                                className="
                                    w-full
                                    bg-[#7A3E2C]
                                    hover:bg-[#693424]
                                    text-white
                                    rounded-lg
                                    py-8
                                    px-8
                                "
                            >
                                <div className="w-full flex items-center justify-between gap-8">
                                    <span className="text-3xl font-secondary font-medium">
                                        Inquire
                                    </span>

                                    <Image
                                        src="/images/whatsapp.png"
                                        alt="whatsapp"
                                        width={30}
                                        height={30}
                                        className="object-contain"
                                    />
                                </div>
                            </Button>
                        </Link>

                        <p className="text-[12px] text-center font-secondary text-black italic mt-2">
                            You won’t be charged yet
                        </p>
                    </Card>
                </div>
            </div>

            {/* POPUP AVAILABILITY CALENDAR – VIEW ONLY */}
            {showAvailabilityModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
                    onClick={() => setShowAvailabilityModal(false)}
                >
                    <div
                        className="bg-[#FCFBF7] rounded-3xl shadow-xl border border-gray-200 px-8 py-6 w-[880px] max-w-[95%]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-[28px] font-primary font-semibold mb-6">
                            Availability calendar
                        </h2>

                        <div className="border border-[#E7E6E2] rounded-3xl px-8 py-8">
                            {/* header navigasi bulan – TANPA teks bulan/tahun di tengah */}
                            <div className="flex items-center justify-between mb-6">
                                <button
                                    onClick={goPrevMonth}
                                    className="p-2 rounded-full hover:bg-gray-100"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>

                                <div className="flex-1" />

                                <button
                                    onClick={goNextMonth}
                                    className="p-2 rounded-full hover:bg-gray-100"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>

                            {/* dua bulan berdampingan */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {renderMonth(baseMonth, baseYear)}
                                {renderMonth(
                                    (baseMonth + 1) % 12,
                                    baseMonth === 11 ? baseYear + 1 : baseYear
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
