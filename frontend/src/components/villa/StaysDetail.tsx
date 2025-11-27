"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    BadgePercent,
    Bath,
    Bed,
    Check,
    ChevronDown,
    Star,
    User,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import Link from "next/link";
import type { villas } from "@/app/data/villas";

import { DateRange, Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { FiMinus, FiPlus } from "react-icons/fi";

type Villa = (typeof villas)[number];

interface DetailProps {
    villa: Villa;
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
}

export default function StaysDetail({ villa, date, setDate }: DetailProps) {
    const [showDatePicker, setShowDatePicker] = useState(false);

    // state check-in & check-out
    const [checkIn, setCheckIn] = useState<Date | undefined>(undefined);
    const [checkOut, setCheckOut] = useState<Date | undefined>(undefined);

    // state visual kalender
    const [dateRange, setDateRange] = useState<Range[]>([
        {
            startDate: undefined,
            endDate: undefined,
            key: "selection",
        },
    ]);

    // state untuk Who
    const [showGuestModal, setShowGuestModal] = useState(false);
    const [guests, setGuests] = useState<number>(0);

    const formatDate = (d?: Date) => {
        if (!d) return "Add Dates";
        return d.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    const getCheckInText = () => formatDate(checkIn);
    const getCheckOutText = () => formatDate(checkOut);

    const handleDateChange = (item: any) => {
        const sel = item.selection as Range;

        // 1) belum ada apa-apa → klik pertama = check-in
        if (!checkIn && !checkOut) {
            if (sel.startDate) {
                setCheckIn(sel.startDate);
                setDate(sel.startDate); // sync ke parent
                setDateRange([
                    {
                        ...sel,
                        endDate: sel.startDate, // highlight 1 hari saja
                    },
                ]);
            }
            return;
        }

        // 2) sudah ada check-in, belum ada check-out → klik kedua = check-out
        if (checkIn && !checkOut) {
            const start = sel.startDate ?? checkIn;
            const end = sel.endDate ?? sel.startDate ?? checkIn;

            const startDate =
                start && end && start > end ? end : start;
            const endDate =
                start && end && start > end ? start : end;

            setCheckIn(startDate || undefined);
            setCheckOut(endDate || undefined);

            setDateRange([
                {
                    ...sel,
                    startDate: startDate || undefined,
                    endDate: endDate || undefined,
                },
            ]);

            setDate(startDate || undefined);

            if (startDate && endDate) {
                setShowDatePicker(false); // auto close setelah pilih checkout
            }
            return;
        }

        // 3) sudah ada check-in & check-out → klik lagi = mulai range baru
        if (checkIn && checkOut) {
            if (sel.startDate) {
                setCheckIn(sel.startDate);
                setCheckOut(undefined);
                setDate(sel.startDate);
                setDateRange([
                    {
                        ...sel,
                        endDate: sel.startDate,
                    },
                ]);
            }
        }
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

                    <p className="text-gray-600 max-w-5xl text-[25px] font-secondary mt-10">
                        Feel both the 90’s weather and the taste of a metropolitan Bandung
                        city during your staycation, without needing to move from one house
                        to another.
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
                                    <span className="font-secondary text-[23px]">{a}</span>
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

                {/* RIGHT SIDE */}
                <div className="lg:col-span-1 mt-5">
                    <Card className="sticky top-2/12 py-10 px-10 rounded-xl shadow-xl bg-[#fcfbf7] border-[#E7E6E2]">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-[16px] font-primary font-bold text-[#2D2A29]">
                                    Weekdays
                                </p>
                                <p className="font-secondary text-[18px] text-[#959290]">
                                    From{" "}
                                    <span className="font-bold text-black">
                                        {villa.weekdayPrice}
                                    </span>
                                </p>
                            </div>
                            <div>
                                <p className="text-[16px] font-primary font-bold text-[#2D2A29]">
                                    Weekends
                                </p>
                                <p className="font-secondary text-[18px] text-[#959290]">
                                    From{" "}
                                    <span className="font-bold text-black">
                                        {villa.weekdayPrice}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <p className="text-[18px] font-secondary text-gray-500 italic flex items-center justify-center gap-1">
                            <BadgePercent className="w-5 h-5" />
                            Prices include all fees
                        </p>

                        {/* CARD RESERVATION */}
                        <div className="rounded-lg overflow-hidden border border-gray-200 text-sm text-gray-500">
                            {/* Dates */}
                            <div className="grid grid-cols-2 divide-x divide-gray-200 border-b border-gray-200">
                                <div className="flex flex-col p-4 bg-[#F8F7F2] border-[#E7E6E2]">
                                    <span className="font-medium font-secondary">
                                        Check in{" "}
                                        <span className="text-gray-400">(Optional)</span>
                                    </span>
                                    <span
                                        className="text-gray-400 font-secondary cursor-pointer"
                                        onClick={() => setShowDatePicker(true)}
                                    >
                                        {getCheckInText()}
                                    </span>
                                </div>

                                <div className="flex flex-col p-4 bg-[#F8F7F2] border-[#E7E6E2]">
                                    <span className="font-medium font-secondary">
                                        Check out{" "}
                                        <span className="text-gray-400">(Optional)</span>
                                    </span>
                                    <span
                                        className="text-gray-400 font-secondary cursor-pointer"
                                        onClick={() => setShowDatePicker(true)}
                                    >
                                        {getCheckOutText()}
                                    </span>
                                </div>
                            </div>

                            {/* Who */}
                            <div
                                className="flex justify-between items-center p-4 bg-[#F8F7F2] border-[#E7E6E2] cursor-pointer"
                                onClick={() => setShowGuestModal(true)}
                            >
                                <div className="flex flex-col">
                                    <span className="font-medium font-secondary">
                                        Who{" "}
                                        <span className="text-gray-400">(Optional)</span>
                                    </span>
                                    <span className="text-gray-400 font-secondary">
                                        {guests > 0 ? `${guests} Guests` : "Add Guests"}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-[#eee9df] px-4 py-4 font-secondary flex justify-between items-center">
                                <p className="text-[12px] font-medium">
                                    Three Nights Weekdays
                                </p>
                                <p className="font-bold text-lg">{villa.totalPrice}</p>
                            </div>
                        </div>

                        <Link href={`/houses/villa/${villa.id}/reserve`} className="block">
                            <Button className="w-full bg-[#7A3E2C] hover:bg-[#693424] text-white rounded-lg py-8">
                                <span className="text-3xl font-secondary">Reserve</span>
                            </Button>
                        </Link>

                        <p className="text-sm text-center font-secondary font-bold text-black italic">
                            You won’t be charged yet
                        </p>
                    </Card>
                </div>
            </div>

            {/* MODAL KALENDER RANGE */}
            {showDatePicker && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
                    onClick={() => setShowDatePicker(false)} // klik luar → tutup
                >
                    <div
                        className="bg-[#FCFBF7] rounded-2xl shadow-xl border border-gray-200 p-6"
                        onClick={(e) => e.stopPropagation()} // blok klik di dalam modal
                    >
                        <DateRange
                            ranges={[
                                {
                                    startDate: checkIn || new Date(),
                                    endDate: checkOut || checkIn || new Date(),
                                    key: "selection",
                                },
                            ]}
                            onChange={handleDateChange}
                            rangeColors={[
                                checkIn ? "#7A3E2C" : "transparent",
                            ]}
                            months={2}
                            direction="horizontal"
                            moveRangeOnFirstSelection={false}
                            editableDateInputs={false}
                        />
                    </div>
                </div>
            )}

            {/* MODAL WHO (GUESTS) – DESIGN SEPERTI CONTOH */}
            {showGuestModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
                    onClick={() => setShowGuestModal(false)} // klik luar → tutup
                >
                    <div
                        className="bg-[#FDFBF6] rounded-3xl shadow-2xl border border-[#E5E2DD] px-8 py-6 w-[420px]"
                        onClick={(e) => e.stopPropagation()} // blok klik di dalam
                    >
                        <div className="flex items-center justify-between font-secondary">
                            <span className="text-[15px] font-medium text-[#2D2A29]">
                                Add Guests
                            </span>

                            <div className="flex items-center gap-3 text-[13px] text-[#7A7A75]">
                                <button
                                    onClick={() => setGuests(Math.max(0, guests - 1))}
                                    disabled={guests === 0}
                                    className="text-[15px] hover:text-gray-800 disabled:opacity-40 transition"
                                >
                                    <FiMinus size={14} />
                                </button>
                                <span className="text-[15px] w-3 text-center">{guests}</span>
                                <button
                                    onClick={() => setGuests(guests + 1)}
                                    className="text-[15px] hover:text-gray-800 transition"
                                >
                                    <FiPlus size={14} />
                                </button>
                            </div>
                        </div>

                        <div className="mt-3 border-b border-[#CFCBC5]" />
                    </div>
                </div>
            )}
        </>
    );
}
