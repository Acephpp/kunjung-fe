"use client"

import { Check } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import type { villas } from "@/app/data/villas"
import SleepArrangementSection from "./SleepArrangement"

type Villa = (typeof villas)[number]

interface StaysDetailContentProps {
    villa: Villa
    date: Date | undefined
    setDate: (date: Date | undefined) => void
}

export default function StaysDetailContent({
    villa,
    date,
    setDate,
}: StaysDetailContentProps) {
    return (
        <div className="space-y-8">

            {/* DESCRIPTION */}
            <div className="mt-6 md:mt-10">
                {villa.description.split("\n\n").map((p, i) => (
                    <p
                        key={i}
                        className="text-gray-700 mb-4 font-secondary
                        text-[16px] sm:text-[18px] md:text-[22px] lg:text-[25px]"
                    >
                        {p}
                    </p>
                ))}
            </div>

            {/* THINGS TO-DO */}
            <div>
                <h2 className="font-primary font-semibold mt-8 md:mt-10
                    text-[26px] sm:text-[30px] md:text-[36px] lg:text-[40px]">
                    Things To-Do
                </h2>

                <p className="text-gray-700 mt-3
                    text-[16px] sm:text-[18px] md:text-[22px] lg:text-[25px]">
                    {villa.thingsToDo}
                </p>
            </div>

            {/* ================= SLEEP ARRANGEMENT ================= */}
            <SleepArrangementSection
                rooms={[
                    { title: "Bedroom 1", description: "1 queen bed", image: "/images/villa-1.jpg" },
                    { title: "Bedroom 2", description: "1 queen bed, 2 double beds, 1 couch", image: "/images/villa-2.jpg" },
                    { title: "Bedroom 3", description: "1 double bed", image: "/images/villa-3.jpg" },
                    { title: "Bedroom 4", description: "1 single bed", image: "/images/villa-4.jpg" },
                    { title: "Living Area", description: "1 couch", image: "/images/villa-1.jpg" },
                    { title: "Extra Room", description: "Flexible sleeping space", image: "/images/villa-2.jpg" },
                ]}
            />
            {/* ================= END SLEEP ARRANGEMENT ================= */}

            <hr className="border-gray-300 md:my-10" />

            {/* AMENITIES */}
            <div>
                <h2 className="font-primary font-semibold mt-8 md:mt-10
                    text-[26px] sm:text-[30px] md:text-[36px] lg:text-[40px]">
                    Amenities
                </h2>

                <div className="
                    grid grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-3
                    gap-y-5 mt-8
                ">
                    {villa.amenities.map((item, i) => (
                        <div
                            key={i}
                            className={`flex items-start gap-4 font-secondary
                            ${item.available
                                ? "text-[#2D2A29]"
                                : "text-[#9B9894] line-through"}`}
                        >
                            {/* ICON */}
                            <div
                                className={`flex items-center justify-center
                                w-6 h-6 rounded-sm border shrink-0 mt-1
                                ${item.available
                                    ? "border-[#2D2A29]"
                                    : "bg-[#2D2A29] border-[#2D2A29]"}`}
                            >
                                {item.available ? (
                                    <Check className="w-4 h-4" />
                                ) : (
                                    <span className="text-white text-sm leading-none">✕</span>
                                )}
                            </div>

                            {/* TEXT */}
                            <span className="
                                leading-snug
                                text-[16px]
                                sm:text-[18px]
                                md:text-[20px]
                                lg:text-[22px]
                            ">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* BUTTON */}
                <button className="
                    mt-8 md:mt-10
                    bg-[#E6E4DE] hover:bg-[#DCDAD4]
                    px-6 md:px-8 py-3 md:py-4
                    rounded-xl
                    font-bold font-secondary
                    text-[16px] md:text-[18px]
                    text-[#2D2A29]
                ">
                    Show all amenities
                </button>
            </div>

            <hr className="border-gray-300 md:my-10" />

            {/* AVAILABILITY */}
            <div>
                <h2 className="font-primary font-semibold mt-8 md:mt-10
                    text-[26px] sm:text-[30px] md:text-[36px] lg:text-[40px]">
                    Availability
                </h2>

                <div className="rounded-md border w-full p-4 mt-5">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={1}
                        className="w-full md:hidden"
                    />

                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                        pagedNavigation
                        className="hidden md:block w-full"
                    />
                </div>
            </div>

            <hr className="border-gray-300 md:my-10" />

            {/* LOCATION */}
            <div>
                <h2 className="font-primary font-semibold mt-8 md:mt-10
                    text-[26px] sm:text-[30px] md:text-[36px] lg:text-[40px]">
                    Location
                </h2>

                <p className="text-gray-700 mt-4 font-secondary
                    text-[16px] sm:text-[18px] md:text-[22px] lg:text-[25px]">
                    {villa.address}
                </p>

                <iframe
                    src={villa.mapUrl}
                    className="rounded-sm mt-5 w-full
                    h-[280px] sm:h-[360px] md:h-[500px]"
                    loading="lazy"
                />
            </div>
        </div>
    )
}
