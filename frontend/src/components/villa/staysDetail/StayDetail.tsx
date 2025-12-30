"use client"

import { useState } from "react"
import type { villas } from "@/app/data/villas"
import type { Range } from "react-date-range"
import StaysDetailIntro from "./StayDetailIntro"
import StaysDetailContent from "./StayDetailContent"
import StaysDetailPricing from "./StayDetailPricing"

type Villa = (typeof villas)[number]

interface DetailProps {
    villa: Villa
    date: Date | undefined
    setDate: (date: Date | undefined) => void
}

export default function StaysDetail({ villa, date, setDate }: DetailProps) {
    const [showDatePicker, setShowDatePicker] = useState(false)

    // state check-in & check-out
    const [checkIn, setCheckIn] = useState<Date | undefined>(undefined)
    const [checkOut, setCheckOut] = useState<Date | undefined>(undefined)

    // state visual kalender
    const [dateRange, setDateRange] = useState<Range[]>([
        {
            startDate: undefined,
            endDate: undefined,
            key: "selection",
        },
    ])

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
                {/* LEFT SIDE */}
                <div className="lg:col-span-2 space-y-6">
                    <StaysDetailIntro villa={villa} />
                    <StaysDetailContent villa={villa} date={date} setDate={setDate} />
                </div>

                {/* RIGHT SIDE */}
                <StaysDetailPricing
                    villa={villa}
                    showDatePicker={showDatePicker}
                    setShowDatePicker={setShowDatePicker}
                    checkIn={checkIn}
                    setCheckIn={setCheckIn}
                    checkOut={checkOut}
                    setCheckOut={setCheckOut}
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                />
            </div>
        </>
    )
}
