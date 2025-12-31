"use client"

import { useState } from "react"
import type { villas } from "@/app/data/villas"
import EventDetailIntro from "./EventDetailIntro"
import EventDetailContent from "./EventDetailContent"
import EventDetailInquiry from "./EventDetailInquiry"

type Villa = (typeof villas)[number]

interface DetailProps {
    villa: Villa
    date: Date | undefined
    setDate: (date: Date | undefined) => void
}

export default function EventDetail({ villa, date, setDate }: DetailProps) {
    const [showAvailabilityModal, setShowAvailabilityModal] = useState(false)

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
                {/* LEFT SIDE */}
                <div className="lg:col-span-2 space-y-6">
                    <EventDetailIntro villa={villa} />
                    <EventDetailContent villa={villa} date={date} setDate={setDate} />
                </div>

                {/* RIGHT SIDE */}
                <EventDetailInquiry
                    showAvailabilityModal={showAvailabilityModal}
                    setShowAvailabilityModal={setShowAvailabilityModal}
                />
            </div>
        </>
    )
}
