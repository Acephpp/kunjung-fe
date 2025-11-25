"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    BadgePercent,
    Bath,
    Bed,
    Check,
    Star,
    User,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import type { villas } from "@/app/data/villas";
import Link from "next/link";

type Villa = (typeof villas)[number];

interface DetailProps {
    villa: Villa;
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
}

export default function ShootDetail({ villa, date, setDate }: DetailProps) {
    return (
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

                {/* Maximum crew capacity */}
                <div className="font-secondary flex justify-between items-center border rounded-md px-6 py-5 text-[18px]">
                    <span>Maximum crew capacity</span>
                    <span className="font-bold">16 crews</span>
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

            {/* RIGHT SIDE – SHOOT BOOKING CARD */}
            <div className="lg:col-span-1 mt-5">
                <Card className="sticky top-2/12 py-10 px-10 rounded-xl shadow-xl bg-[#fcfbf7] border-[#E7E6E2] flex flex-col gap-6">
                    {/* Box dengan dates / type of shoot / crew */}
                    <div className="rounded-lg border border-gray-200 bg-[#F8F7F2] text-sm text-gray-700 overflow-hidden">
                        {/* Dates */}
                        <div className="flex justify-between items-center px-4 py-4 border-b border-gray-200">
                            <div className="flex flex-col">
                                <span className="text-[11px] font-secondary text-gray-500 uppercase tracking-wide">
                                    Dates
                                </span>
                                <span className="text-[14px] font-secondary text-[#2D2A29]">
                                    10 - 11 Oct, 2025
                                </span>
                            </div>
                            <button className="text-[12px] font-secondary text-[#7A3E2C] bg-[#EDE5DD] rounded-md px-3 py-1">
                                change
                            </button>
                        </div>

                        {/* Type of shoot */}
                        <div className="flex justify-between items-center px-4 py-4 border-b border-gray-200">
                            <div className="flex flex-col">
                                <span className="text-[11px] font-secondary text-gray-500 uppercase tracking-wide">
                                    Type of shoot
                                </span>
                                <span className="text-[14px] font-secondary text-[#2D2A29]">
                                    Instacation
                                </span>
                            </div>
                            <button className="text-[12px] font-secondary text-[#7A3E2C] bg-[#EDE5DD] rounded-md px-3 py-1">
                                change
                            </button>
                        </div>

                        {/* Crew */}
                        <div className="flex justify-between items-center px-4 py-4 border-b border-gray-200">
                            <div className="flex flex-col">
                                <span className="text-[11px] font-secondary text-gray-500 uppercase tracking-wide">
                                    Crew
                                </span>
                                <span className="text-[14px] font-secondary text-[#2D2A29]">
                                    12 person
                                </span>
                            </div>
                            <button className="text-[12px] font-secondary text-[#7A3E2C] bg-[#EDE5DD] rounded-md px-3 py-1">
                                change
                            </button>
                        </div>

                        {/* Price row */}
                        <div className="flex justify-between items-center px-4 py-4">
                            <p className="text-[11px] font-secondary text-gray-500">
                                One Nights Instacation
                            </p>
                            <p className="text-[16px] font-secondary font-semibold text-[#2D2A29]">
                                Rp4.500.000
                            </p>
                        </div>
                    </div>

                    {/* Info harga */}
                    <p className="text-[14px] font-secondary text-gray-500 italic flex items-center gap-2">
                        <BadgePercent className="w-4 h-4" />
                        Prices include all fees
                    </p>

                    {/* Tombol Reserve */}
                    <Link href={`/houses/villa/${villa.id}/reserve`} className="block">
                        <Button className="w-full bg-[#7A3E2C] hover:bg-[#693424] text-white rounded-lg py-8">
                            <span className="text-3xl font-secondary">Reserve</span>
                        </Button>
                    </Link>

                    <p className="text-[12px] text-center font-secondary text-black italic mt-2">
                        You won’t be charged yet
                    </p>
                </Card>
            </div>
        </div>
    );
}
