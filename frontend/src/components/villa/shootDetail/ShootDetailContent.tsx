"use client"

import { Check } from "lucide-react"
import { Calendar as AvailabilityCalendar, Calendar } from "@/components/ui/calendar"
import type { villas } from "@/app/data/villas"
import { useState } from "react"
import AmenitiesModal from "../staysDetail/AmenitiesModal"

type Villa = (typeof villas)[number]

interface ShootDetailContentProps {
    villa: Villa
    date: Date | undefined
    setDate: (date: Date | undefined) => void
}

export default function ShootDetailContent({ villa, date, setDate }: ShootDetailContentProps) {
    const [showAmenities, setShowAmenities] = useState(false)
    return (
        <div className="space-y-8">

            {/* DESCRIPTION */}
            <div className="mt-6 md:mt-10">
                {villa.description.split("\n\n").map((p, i) => (
                    <p
                        key={i}
                        className="
                            text-gray-700 mb-4 font-secondary
                            text-[16px] sm:text-[18px] md:text-[22px] lg:text-[25px]
                        "
                    >
                        {p}
                    </p>
                ))}
            </div>

            {/* THINGS TO-DO */}
            <div>
                <h2
                    className="
                        font-primary font-semibold mt-8 md:mt-10
                        text-[26px] sm:text-[30px] md:text-[36px] lg:text-[40px]
                    "
                >
                    Things To-Do
                </h2>

                <p
                    className="
                        text-gray-700 mt-3
                        text-[16px] sm:text-[18px] md:text-[22px] lg:text-[25px]
                    "
                >
                    {villa.thingsToDo}
                </p>
            </div>

            <hr className="border-gray-300 md:my-10" />

            {/* AMENITIES */}
            <div>
                <h2
                    className="
            font-primary font-semibold mt-8 md:mt-10
            text-[26px] sm:text-[30px] md:text-[36px] lg:text-[40px]
        "
                >
                    Amenities
                </h2>

                <div
                    className="
            grid grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-y-5 mt-8
        "
                >
                    {villa.amenities.map((item, i) => (
                        <div
                            key={i}
                            className={`flex items-center gap-4 font-secondary
                    ${item.available
                                    ? "text-[#2D2A29]"
                                    : "text-[#9B9894] line-through"}
                `}
                        >
                            {/* ICON */}
                            <div
                                className={`flex items-center justify-center
                        w-6 h-6 rounded-sm border shrink-0
                        ${item.available
                                        ? "border-[#2D2A29]"
                                        : "bg-[#2D2A29] border-[#2D2A29]"}
                    `}
                            >
                                {item.available ? (
                                    <Check className="w-4 h-4" />
                                ) : (
                                    <span className="text-white text-sm leading-none">✕</span>
                                )}
                            </div>

                            {/* TEXT */}
                            <span
                                className="
                        leading-none
                        text-[16px]
                        sm:text-[18px]
                        md:text-[20px]
                        lg:text-[22px]
                    "
                            >
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => setShowAmenities(true)}
                    className="
        mt-8 md:mt-10
        bg-[#E6E4DE] hover:bg-[#DCDAD4]
        px-6 md:px-8 py-3 md:py-4
        rounded-xl
        font-bold font-secondary
        text-[16px] md:text-[18px]
        text-[#2D2A29]
    "
                >
                    Show all amenities
                </button>
            </div>


            <hr className="border-gray-300 md:my-10" />

            {/* AVAILABILITY */}
            <div>
                <h2
                    className="
                        font-primary font-semibold mt-8 md:mt-10
                        text-[26px] sm:text-[30px] md:text-[36px] lg:text-[40px]
                    "
                >
                    Availability
                </h2>

                <div
                    className="
                        mt-5 w-full
                        border border-[#2D2A29]
                        rounded-xl
                        overflow-hidden
                        bg-[#FCFBF7]
                    "
                >
                    {/* MOBILE */}
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={1}
                        className="
                            w-full md:hidden
                            p-4
                            [&_.rdp-caption]:mb-4
                            [&_.rdp-caption_label]:font-secondary
                            [&_.rdp-caption_label]:text-[16px]
                            [&_.rdp-nav_button]:text-[#2D2A29]
                            [&_.rdp-head_cell]:text-[12px]
                            [&_.rdp-head_cell]:font-secondary
                            [&_.rdp-cell]:h-10
                            [&_.rdp-cell]:w-10
                        "
                    />

                    {/* DESKTOP */}
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                        pagedNavigation
                        className="
                            hidden md:block w-full
                            p-6
                            [&_.rdp-months]:gap-12
                            [&_.rdp-caption]:mb-6
                            [&_.rdp-caption_label]:font-secondary
                            [&_.rdp-caption_label]:text-[16px]
                            [&_.rdp-nav_button]:text-[#2D2A29]
                            [&_.rdp-head_cell]:text-[12px]
                            [&_.rdp-head_cell]:font-secondary
                            [&_.rdp-cell]:h-10
                            [&_.rdp-cell]:w-10
                        "
                    />
                </div>
            </div>

            <hr className="border-gray-300 md:my-10" />

            {/* LOCATION */}
            <div>
                <h2
                    className="
                        font-primary font-semibold mt-8 md:mt-10
                        text-[26px] sm:text-[30px] md:text-[36px] lg:text-[40px]
                    "
                >
                    Location
                </h2>

                <p
                    className="
                        text-gray-700 mt-4 font-secondary
                        text-[16px] sm:text-[18px] md:text-[22px] lg:text-[25px]
                    "
                >
                    {villa.address}
                </p>

                <iframe
                    src={villa.mapUrl}
                    className="
                        rounded-sm mt-5 w-full
                        h-[280px] sm:h-[360px] md:h-[500px]
                    "
                    loading="lazy"
                />
            </div>
            <AmenitiesModal
                open={showAmenities}
                onClose={() => setShowAmenities(false)}
                groups={[
                    {
                        title: "Bathroom",
                        items: [{ label: "Outdoor shower", available: true }],
                    },
                    {
                        title: "Entertainment",
                        items: [{ label: "TV", available: true }],
                    },
                    {
                        title: "Heating and cooling",
                        items: [{ label: "Air conditioning", available: true }],
                    },
                    {
                        title: "Home safety",
                        items: [
                            {
                                label: "Exterior security cameras on property",
                                available: true,
                                description:
                                    "We have security cameras covering the front area of the house (carport, gate and front yard), the side of the house and the backyard area.",
                            },
                            { label: "Fire extinguisher", available: true },
                            { label: "First aid kit", available: true },
                        ],
                    },
                    {
                        title: "Internet and office",
                        items: [
                            { label: "Wifi", available: true },
                            { label: "Dedicated workspace", available: true },
                        ],
                    },
                    {
                        title: "Kitchen and dining",
                        items: [
                            {
                                label: "Kitchen",
                                available: true,
                                description: "Space where guests can cook their own meals",
                            },
                        ],
                    },
                    {
                        title: "Outdoor",
                        items: [
                            { label: "Outdoor dining area", available: true },
                            { label: "BBQ grill", available: true },
                        ],
                    },
                    {
                        title: "Parking and facilities",
                        items: [
                            { label: "Free parking on premises", available: true },
                            { label: "Hot tub", available: true },
                        ],
                    },
                    {
                        title: "Services",
                        items: [
                            { label: "Smoking allowed", available: true },
                            { label: "Self check-in", available: true },
                            {
                                label: "Building staff",
                                available: true,
                                description:
                                    "Someone is available 24 hours a day to let guests in",
                            },
                        ],
                    },
                ]}
                notIncluded={[
                    { label: "Washer", available: false },
                    { label: "Dryer", available: false },
                    { label: "Essentials", available: false },
                    {
                        label: "Smoke alarm",
                        available: false,
                        description: "There is no smoke alarm on the property.",
                    },
                    {
                        label: "Carbon monoxide alarm",
                        available: false,
                        description:
                            "There is no carbon monoxide detector on the property.",
                    },
                    { label: "Heating", available: false },
                    { label: "Hot water", available: false },
                ]}
            />
        </div>
    )
}
