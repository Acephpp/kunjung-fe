"use client"

import { useState } from "react"
import type { Range } from "react-date-range"

import type { villas } from "@/app/data/villas"
import ShootDetailIntro from "./ShootDetailIntro"
import ShootDetailContent from "./ShootDetailContent"
import ShootDetailBooking from "./ShootDetailBooking"

type Villa = (typeof villas)[number]
type ShootType = "instacation" | "session-morning" | "session-afternoon" | "session-fullday"

interface DetailProps {
    villa: Villa
    date: Date | undefined
    setDate: (date: Date | undefined) => void
}

export default function ShootDetail({ villa, date, setDate }: DetailProps) {
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [checkIn, setCheckIn] = useState<Date | undefined>(undefined)
    const [checkOut, setCheckOut] = useState<Date | undefined>(undefined)
    const [dateRange, setDateRange] = useState<Range[]>([{ startDate: undefined, endDate: undefined, key: "selection" }])
    const [shootType, setShootType] = useState<ShootType>("instacation")
    const [crew, setCrew] = useState<number>(12)

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
            {/* LEFT SIDE */}
            <div className="lg:col-span-2 space-y-6">
                <ShootDetailIntro villa={villa} />
                <ShootDetailContent villa={villa} date={date} setDate={setDate} />
            </div>

            {/* RIGHT SIDE */}
            <div className="lg:col-span-1 mt-5">
                <ShootDetailBooking
                    villa={villa}
                    date={date}
                    setDate={setDate}
                    showDatePicker={showDatePicker}
                    setShowDatePicker={setShowDatePicker}
                    checkIn={checkIn}
                    setCheckIn={setCheckIn}
                    checkOut={checkOut}
                    setCheckOut={setCheckOut}
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                    shootType={shootType}
                    setShootType={setShootType}
                    crew={crew}
                    setCrew={setCrew}
                />
            </div>
        </div>
    )
}
